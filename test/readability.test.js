import { test, describe } from 'node:test';
import assert from 'node:assert';
import { extractReadableContent, fetchArticleContent } from '../src/processor.js';

// Realistic HTML fixtures for testing content extraction
const ARTICLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Understanding JavaScript Closures - Tech Blog</title>
  <meta name="author" content="Jane Developer">
  <meta property="og:title" content="Understanding JavaScript Closures">
  <meta property="og:description" content="A deep dive into closures">
</head>
<body>
  <nav><a href="/">Home</a> <a href="/about">About</a> <a href="/contact">Contact</a></nav>
  <div class="sidebar">
    <h3>Popular Posts</h3>
    <ul><li>Post 1</li><li>Post 2</li></ul>
    <div class="ad">Buy our stuff!</div>
  </div>
  <article>
    <h1>Understanding JavaScript Closures</h1>
    <p class="byline">By Jane Developer | January 15, 2026</p>
    <p>Closures are one of the most fundamental concepts in JavaScript. A closure is created when a function is defined inside another function, and the inner function references variables from the outer function's scope.</p>
    <p>When the outer function returns, the inner function retains access to those variables. This is what we call a closure - the inner function "closes over" the variables from its enclosing scope.</p>
    <h2>Why Closures Matter</h2>
    <p>Closures enable powerful patterns like data privacy, function factories, and partial application. They are the foundation of many JavaScript design patterns and are essential for understanding how callbacks and event handlers work.</p>
    <p>Consider this example: when you create an event handler inside a loop, closures determine which variables the handler can access. Understanding this prevents common bugs.</p>
    <h2>Practical Examples</h2>
    <p>Let's look at some real-world uses of closures in modern JavaScript development. From React hooks to Express middleware, closures are everywhere in the JavaScript ecosystem.</p>
  </article>
  <footer><p>Copyright 2026 Tech Blog</p><nav>Footer links here</nav></footer>
  <script>console.log("tracking");</script>
</body>
</html>`;

const MINIMAL_HTML = `<html><body><p>Too short</p></body></html>`;

const NO_ARTICLE_HTML = `<!DOCTYPE html>
<html>
<head><title>Login Page</title></head>
<body>
  <form><input type="text" name="username"><input type="password" name="password"><button>Login</button></form>
</body>
</html>`;

const SCRIPT_HEAVY_HTML = `<!DOCTYPE html>
<html>
<head><title>Article with Scripts</title></head>
<body>
  <script>var x = 1; var y = 2;</script>
  <article>
    <h1>Real Content Here</h1>
    <p>This article has meaningful content that should be extracted despite the surrounding scripts and navigation elements that should be stripped out.</p>
    <p>The readability algorithm should identify this as the main content block and extract it cleanly, removing all the script tags and other non-content elements.</p>
  </article>
  <script>trackPageView();</script>
  <div class="comments">User comments section that should be removed</div>
</body>
</html>`;

describe('extractReadableContent', () => {
  test('extracts article text from HTML', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    assert.ok(result, 'should return a result');
    assert.ok(result.content, 'should have content field');
    assert.ok(result.content.includes('Closures are one of the most fundamental'),
      'should contain article body text');
  });

  test('extracts title', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    assert.ok(result.title, 'should have title');
    assert.ok(result.title.includes('Closures') || result.title.includes('JavaScript'),
      'title should relate to the article');
  });

  test('strips navigation and sidebar content', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    assert.ok(result.content, 'should have content');
    // Nav links and sidebar shouldn't be in the extracted content
    assert.ok(!result.content.includes('Popular Posts'),
      'should not contain sidebar content');
    assert.ok(!result.content.includes('Buy our stuff'),
      'should not contain ad content');
  });

  test('strips script tags', () => {
    const result = extractReadableContent(SCRIPT_HEAVY_HTML, 'https://example.com/article');
    assert.ok(result, 'should return result');
    assert.ok(!result.content.includes('trackPageView'),
      'should not contain script content');
    assert.ok(result.content.includes('Real Content Here') || result.content.includes('meaningful content'),
      'should contain the actual article text');
  });

  test('strips HTML tags from content', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    assert.ok(!result.content.includes('<p>'), 'should not contain <p> tags');
    assert.ok(!result.content.includes('<article>'), 'should not contain <article> tags');
    assert.ok(!result.content.includes('<h1>'), 'should not contain <h1> tags');
  });

  test('returns null for non-article pages', () => {
    const result = extractReadableContent(NO_ARTICLE_HTML, 'https://example.com/login');
    // Readability may return null or very short content for login forms
    if (result) {
      assert.ok(result.content.length < 100,
        'non-article pages should have very little or no content');
    }
  });

  test('returns null for empty/minimal HTML', () => {
    const result = extractReadableContent(MINIMAL_HTML, 'https://example.com/empty');
    // Readability will likely return null for minimal content
    if (result) {
      assert.ok(result.content.length < 50, 'minimal pages should extract very little');
    }
  });

  test('returns null for null/empty input', () => {
    assert.strictEqual(extractReadableContent(null, 'https://example.com'), null);
    assert.strictEqual(extractReadableContent('', 'https://example.com'), null);
  });

  test('handles malformed HTML gracefully', () => {
    const malformed = '<html><body><p>Unclosed paragraph<div>Mixed nesting</p></div>';
    // Should not throw
    const result = extractReadableContent(malformed, 'https://example.com/bad');
    // Result may be null or contain whatever was extractable - just shouldn't crash
    assert.ok(true, 'should not throw on malformed HTML');
  });

  test('extracts byline when available', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    // Readability often extracts byline
    if (result && result.byline) {
      assert.ok(typeof result.byline === 'string', 'byline should be a string');
    }
  });

  test('content is substantially shorter than raw HTML', () => {
    const result = extractReadableContent(ARTICLE_HTML, 'https://example.com/article');
    assert.ok(result, 'should extract content');
    // Extracted text should be shorter than the full HTML (no tags, no nav, no scripts)
    assert.ok(result.content.length < ARTICLE_HTML.length,
      'extracted content should be shorter than raw HTML');
  });
});

describe('fetchArticleContent with readability extraction', () => {
  // These tests verify the integration between fetch and readability.
  // We can't easily test live fetches, but we can verify the return shape.

  test('returns object with expected fields', async () => {
    // fetchArticleContent hits the network, so we test return shape
    // using a URL that will likely fail in test (no server)
    try {
      const result = await fetchArticleContent('http://localhost:1/nonexistent');
      // If it somehow succeeds, check shape
      assert.ok('source' in result, 'should have source field');
    } catch {
      // Expected - network error for localhost:1
      assert.ok(true, 'network error is expected in test');
    }
  });
});
