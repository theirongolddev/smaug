import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { slugify, writeContentFile } from '../src/processor.js';

describe('slugify', () => {
  test('converts title to lowercase kebab-case', () => {
    assert.strictEqual(slugify('Understanding JavaScript Closures'), 'understanding-javascript-closures');
  });

  test('strips special characters', () => {
    assert.strictEqual(slugify('What\'s New in React 19?'), 'what-s-new-in-react-19');
  });

  test('collapses multiple dashes', () => {
    assert.strictEqual(slugify('AI --- The Future'), 'ai-the-future');
  });

  test('trims leading/trailing dashes', () => {
    assert.strictEqual(slugify('  --Hello World--  '), 'hello-world');
  });

  test('handles empty string', () => {
    assert.strictEqual(slugify(''), 'untitled');
  });

  test('handles null/undefined', () => {
    assert.strictEqual(slugify(null), 'untitled');
    assert.strictEqual(slugify(undefined), 'untitled');
  });

  test('truncates long titles', () => {
    const long = 'a'.repeat(200);
    const result = slugify(long);
    assert.ok(result.length <= 80, `slug should be <= 80 chars, got ${result.length}`);
  });

  test('handles unicode gracefully', () => {
    const result = slugify('Cafe\u0301 au lait');
    assert.ok(result.length > 0, 'should produce a non-empty slug');
    assert.ok(!result.includes(' '), 'should not contain spaces');
  });

  test('extracts slug from URL when title is a URL', () => {
    assert.strictEqual(slugify('https://example.com/blog/my-great-post'), 'my-great-post');
  });

  test('handles GitHub full names', () => {
    assert.strictEqual(slugify('anthropics/claude-code'), 'anthropics-claude-code');
  });
});

describe('writeContentFile', () => {
  const tmpDir = path.join(os.tmpdir(), `smaug-test-${Date.now()}`);

  // Clean up after all tests
  test('setup temp dir', () => {
    fs.mkdirSync(tmpDir, { recursive: true });
  });

  test('writes article content file with frontmatter and full content', () => {
    const result = writeContentFile({
      type: 'article',
      title: 'Understanding Closures',
      author: 'janedev',
      source: 'https://example.com/closures-article',
      tweetUrl: 'https://x.com/janedev/status/123',
      content: 'Closures are one of the most fundamental concepts in JavaScript...',
      byline: 'Jane Developer',
      folder: path.join(tmpDir, 'articles'),
    });

    assert.ok(result, 'should return a file path');
    assert.ok(fs.existsSync(result), 'file should exist on disk');

    const written = fs.readFileSync(result, 'utf8');
    assert.ok(written.includes('title: "Understanding Closures"'), 'should have title in frontmatter');
    assert.ok(written.includes('type: article'), 'should have type');
    assert.ok(written.includes('NEEDS_ANALYSIS'), 'should have analysis placeholder');
    assert.ok(written.includes('## Full Content'), 'should have full content section');
    assert.ok(written.includes('Closures are one of the most fundamental'), 'should have the actual content');
    assert.ok(written.includes('[Article](https://example.com/closures-article)'), 'should have article link');
    assert.ok(written.includes('[Original Tweet](https://x.com/janedev/status/123)'), 'should have tweet link');
  });

  test('writes github content file with readme', () => {
    const result = writeContentFile({
      type: 'github',
      title: 'claude-code',
      author: 'anthropics',
      source: 'https://github.com/anthropics/claude-code',
      tweetUrl: 'https://x.com/someone/status/456',
      fullName: 'anthropics/claude-code',
      description: 'CLI tool for Claude',
      stars: 5000,
      language: 'TypeScript',
      topics: ['ai', 'cli'],
      readme: '# Claude Code\n\nA CLI tool for interacting with Claude.',
      folder: path.join(tmpDir, 'tools'),
    });

    assert.ok(result, 'should return a file path');
    assert.ok(fs.existsSync(result), 'file should exist on disk');

    const written = fs.readFileSync(result, 'utf8');
    assert.ok(written.includes('type: tool'), 'should have tool type');
    assert.ok(written.includes('## README'), 'should have README section');
    assert.ok(written.includes('# Claude Code'), 'should have readme content');
    assert.ok(written.includes('stars: 5000'), 'should have stars');
  });

  test('writes x-article content file', () => {
    const result = writeContentFile({
      type: 'x-article',
      title: 'My X Article',
      author: 'xwriter',
      source: 'https://x.com/i/article/123456',
      tweetUrl: 'https://x.com/xwriter/status/789',
      content: 'This is the full X article content that was extracted via bird CLI...',
      folder: path.join(tmpDir, 'articles'),
    });

    assert.ok(result, 'should return a file path');
    const written = fs.readFileSync(result, 'utf8');
    assert.ok(written.includes('type: x-article'), 'should have x-article type');
    assert.ok(written.includes('full X article content'), 'should have content');
  });

  test('returns null when no content to write', () => {
    const result = writeContentFile({
      type: 'article',
      title: 'Empty Article',
      author: 'nobody',
      source: 'https://example.com/empty',
      tweetUrl: 'https://x.com/nobody/status/000',
      content: null,
      folder: path.join(tmpDir, 'articles'),
    });

    assert.strictEqual(result, null, 'should return null for empty content');
  });

  test('returns null for paywalled content', () => {
    const result = writeContentFile({
      type: 'article',
      title: 'Paywalled',
      author: 'nyt',
      source: 'https://nytimes.com/article',
      tweetUrl: 'https://x.com/nyt/status/111',
      content: 'Subscribe to read...',
      paywalled: true,
      folder: path.join(tmpDir, 'articles'),
    });

    assert.strictEqual(result, null, 'should return null for paywalled content');
  });

  test('avoids filename collisions by appending suffix', () => {
    const folder = path.join(tmpDir, 'collision-test');
    const opts = {
      type: 'article',
      title: 'Same Title',
      author: 'test',
      source: 'https://example.com/1',
      tweetUrl: 'https://x.com/test/status/1',
      content: 'First article content',
      folder,
    };

    const first = writeContentFile(opts);
    const second = writeContentFile({ ...opts, source: 'https://example.com/2', content: 'Second article' });

    assert.ok(first, 'first should succeed');
    assert.ok(second, 'second should succeed');
    assert.notStrictEqual(first, second, 'should have different paths');
    assert.ok(fs.existsSync(first));
    assert.ok(fs.existsSync(second));
  });

  test('creates folder if it does not exist', () => {
    const deepFolder = path.join(tmpDir, 'deep', 'nested', 'dir');
    const result = writeContentFile({
      type: 'article',
      title: 'Deep Nested',
      author: 'deep',
      source: 'https://example.com/deep',
      tweetUrl: 'https://x.com/deep/status/999',
      content: 'Content in a deeply nested directory',
      folder: deepFolder,
    });

    assert.ok(result, 'should return path');
    assert.ok(fs.existsSync(result), 'file should exist');
  });

  test('cleanup temp dir', () => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
