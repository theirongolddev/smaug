---
title: "System Design Thinking: Build A File Tree CLI"
type: x-article
date_added: 2026-02-09
source: "https://x.com/i/article/2015364734262935552"
author: "EOEboh"
tags: ["system-design", "architecture", "cli-tools", "software-engineering", "decomposition"]
via: "Twitter bookmark from @EOEboh"
---

A comprehensive guide to approaching software design methodically rather than rushing into code. The author demonstrates system design thinking through the example of building a file tree CLI tool, breaking down the discipline into seven concrete steps: understanding the problem completely, decomposing into logical layers, designing data flow, defining data models, identifying core algorithms, handling errors strategically, and planning for extensibility.

## Key Takeaways
- Decompose problems into independent pieces with single responsibilities before writing code
- Choose data structures before algorithms—good structures make algorithms simple
- Define clear boundaries and interfaces between system layers
- Plan for failure by designing graceful degradation where appropriate
- Identify points of future change early and isolate them behind interfaces
- Use incremental development—ship v1 simply, then add complexity in each version
- Think about testability from the start; good architecture makes testing independent and focused

## Full Content

System Design Thinking: Build A File Tree CLI

I have been coding for some years now, and it's only recently that I started 'thinking in systems'.  The necessity came when I began preparing to interview for more senior roles as a software engineer. Still, the benefits of thinking and approaching a problem this way have extended even beyond the scope of interviews.

This is a short article on how thinking in systems transforms code from a mess of functions into an elegant, maintainable solution.

## The Problem

You are required to build a CLI tool that will take in a file path from a project or directory and display its file structure or file tree. This sounds simple enough, does it not?

You could quickly open your editor and hack together a script in 30 minutes, and it would just work. Easy peasy, job done! But I have some questions for you:

- would you be able to extend it six months from now?

- would another developer understand it?

- did you consider edge cases and gotchas?

- could you swap out the output format without rewriting everything?

This is where system design thinking separates quick hacks from quality software.

## The High-Level Approach (System Design Thinking)

The difference here is that you are not just rushing to open your machine and type code; you are breaking down your approach into smaller, important steps that will enable you to build a robust solution from scratch.

Resist the urge to open your editor and start typing. Great systems emerge from great questions, not great typing speed.

## Step 1: Understand the Problem Completely

This should be your first goal - to fully understand the challenge you are faced with by ASKING CLARIFYING QUESTIONS:

What does the user actually want?

- to be able to see a visual representation of any directory/folder

What is the INPUT?

- A directory path (or current directory by default)

- Maybe some options (depth limit, ignore patterns, output format)

What is the OUTPUT?

- A visual tree representation

- Could be plain text, markdown, JSON, etc.

What can go wrong? (edge cases)

- Permission denied folders

- Circular symlinks (to prevent infinite recursion)

- Very deep directories

- Empty folders

- Single files (not directories)

- Invalid paths

It is a good idea to write these down; this way, you have transformed a vague idea into a concrete specification you can work with.

## Step 2: Break It Into Logical Pieces

The key insight in system design thinking is recognizing that every non-trivial problem contains multiple distinct responsibilities. The question is, can you see them?

This is key because it teaches you how to effectively separate concerns and form building blocks.

For our file tree tool, three clear responsibilities emerge:

1. User Interface Layer (CLI Handling)

- Parse command-line arguments

- Validate user input

- Display output

2. Domain Layer (Core Business Logic)

- Traverse the filesystem

- Build an in-memory representation

- Apply filtering rules

3. Presentation Layer (Format and Show Results)

- Convert data to tree view

- Convert data to markdown or JSON

Notice that we have separated the what from the how. The domain layer doesn't care whether output is JSON or ASCII art. The formatter doesn't care how files were discovered. The interface layer orchestrates but doesn't implement.

This is the Unix philosophy in practice: do one thing well, and compose.

Why is separation important? You can change the CLI to a web API, you can add new output formats without touching the core logic, and you can test independently.

## Step 3: Design the Data Flow

Now that you have broken down the challenge into logical pieces, map out how data flows through your system:

User Input => Parse & Validate => traverse filesystem & build tree structure (in memory) => Format tree (json/markdown) => Output to the user

Some key questions to ask at this stage:

- Where do errors happen? How do I handle them?

- What shape is my data at each step?

- How do the layers interact with each other?

## Step 4: Define Your Data Model Structure

Before the main algorithm, figure out your data model. This will help you decide the appropriate structure and make your algorithm simple.

In our case, which is a file tree where the input involves a directory path that could contain files and other directories, a recursive pattern is the go-to.

So if you are using Go, for example, the data model could look like this:

```go
type Node struct {
    Name     string         // main.go
    Path     string.          // /project/src/main.go
    IsDir    bool.             // true/false
    Children []*Node  // only if directory
}
```

Why this matters: Good data structures make algorithms simple. Bad data structures make everything painful

Ask yourself: "What information do I need to carry through my system?"

## Step 5: Identify the Core Algorithm

With our data model structure now defined, the core algorithm becomes straightforward:

```go
function buildTree(path):
    1. Get info about this path
    2. Create a node for it
    3. IF it's a directory:
       - List all entries in it
       - FOR EACH entry:
           - Recursively call buildTree on it
           - Add result as a child
    4. Return the node
```

The algorithm above is depth-first traversal, a classic recursion pattern for a tree data structure (folders contain folders). We are not inventing any new pattern; we are simply mapping the standard approach to a well-understood structure.

The beauty here is that the algorithm knows nothing about the CLI parsing or output formatting. It has one job: build the tree.

## Step 6: Consider Error Handling Strategy

In the real world, things can fail. User input can be invalid. Disks have permission errors. Symlinks create infinite cycles. Files get deleted mid-scan. Paths can be empty or not exist.

For a CLI tool like ours, we face a design choice:

- Fail fast: Stop at the first error

- Graceful degradation: Skip problematic files and continue

The right choice depends on your use case and users. For a development tool, graceful degradation usually wins. A developer wants to see what they can access, even if some folders are locked.

```go
if err != nil {
    return nil, err  // Fail fast
}

if err != nil {
    continue  // Skip and keep going
}
```

## Step 7: Plan for Extensibility

The best systems make future changes easy. How?

You have to first identify the points where change can happen in the future and isolate them behind a clear interface.

In the case of our tree tool:

- New output formats? add support for  XML and YAML (Separate formatter)

- New input sources? you want users to also traverse Git repos and cloud APIs, not just their local filesystem

- Filtering/ignoring files? users typically want to ignore certain files/folders. Make it configurable for complex ignore cases

```go
// Bad: Hard to add formats
func Format(node *Node) string {
    return toTree(node)
}

// Good: Easy to add formats
func Format(node *Node, format string) string {
    switch format {
    case "tree":
        return toTree(node)
    case "markdown":
        return toMarkdown(node)
    case "json":
        return toJSON(node)
    // Easy to add more!
    }
}
```

Tip: The Open/Closed design principle is a standard best practice:

- Open for extension (easy to add features)

- Closed for modification (don't break existing code)

Adding a new format will not require any change to the tree-building logic. This ensures the system is open for extension but closed for modification.

## Important Consideration: Testing

The payoff of good system design is testability. Because each layer is independent. You can test the CLI without touching the filesystem, test formatting with fixed Node structures, test tree building with mock filesystems, and so on.

Each test becomes faster, more focused, and more reliable.

## Some Key Takeaways Beyond This Article

Unless you are in an interview setting and presented with a hypothetical case, don't build the final system on day one. Start with the simplest thing that could possibly work:

Version 1: a simple cli that prints to the console or terminal

Version 2: add command-line flags

Version 3: add multiple output formats

Version 4: add filtering and ignore patterns

Each version is fully functional and teaches you something. By the time you reach version 4, you have a well-abstracted and battle-tested system.

The principles here transcend beyond file tree tools:

- Decomposition: Break problems into independent pieces with single responsibilities

- Data-first thinking: Choose data structures before algorithms

- Clear boundaries: Define clear interfaces between layers

- Robust error handling: Plan for failure, design for degradation

- Extensibility: Identify what might change, isolate it

- Incremental development: Make it simple first, add complexity later

Moving from just blind "coding" to "system design thinking" is a mental shift. You stop asking, "How do I implement this?" and start asking:

- What are the core abstractions?

- Where are the boundaries?

- What can change independently?

- How does data flow?

- What can fail?

The code becomes an afterthought that is easier to write. You simply translate a well-understood system into the programming language of your choice.

## Links

- [Article](https://x.com/i/article/2015364734262935552)
- [Original Tweet](https://x.com/EOEboh/status/2015421263691268354)
