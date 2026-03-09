---
title: "Investigate ghostty issue 8208 using gh CLI"
type: article
date_added: 2026-03-08
source: "https://ampcode.com/threads/T-019cbadf-cb5a-742e-b0e3-2d7164de743f"
author: "mitchellh"
tags: [ai-debugging, codex, ghostty, reasoning-levels, case-study, agentic-engineering]
via: "Twitter bookmark from @mitchellh"
---

Real-world case study from Mitchell Hashimoto (Ghostty creator) of Codex 5.3 with xhigh reasoning solving a 6-month-old GTK4 bug in 45 minutes for $4.14. The critical differentiator: xhigh reasoning eventually read GTK4 source code directly — something lower reasoning levels and Opus 4.6 never attempted. The retrieved content file is the agent's raw grep output from the Ghostty codebase during its investigation. Final fix was small, single-file, and understandable, requiring one manual bug fix plus style cleanup.

## Key Takeaways
- Codex 5.3 xhigh solved in 45 min / $4.14 what developers couldn't fix in 6 months
- Critical factor: xhigh went beyond the repo to read GTK4 source code — lower effort levels didn't
- Using `gh` CLI for context retrieval was key to giving the agent rich issue + codebase context
- Reasoning effort level (xhigh vs. medium) is the highest-leverage variable for hard debugging tasks
- Fix quality: small, single-file, understandable — required minimal human cleanup

## Full Content

src/apprt/gtk/build/gresource.zig:48:    .{ .major = 1, .minor = 5, .name = "split-tree" },
src/apprt/gtk/build/gresource.zig:49:    .{ .major = 1, .minor = 5, .name = "split-tree-split" },
src/apprt/gtk/winproto/x11.zig:296:            .{ .mode = .replace },
src/apprt/gtk/winproto/x11.zig:338:            .{ .mode = .replace },
src/apprt/gtk/winproto/x11.zig:474:    replace = c.PropModeReplace,
src/apprt/gtk/winproto/wayland.zig:30:        // FIXME: replace with `zxdg_decoration_v1` once GTK merges
src/apprt/gtk/ipc/DBus.zig:45:            std.mem.replaceScalar(u8, object_path, '.', '/');
src/apprt/gtk/ipc/DBus.zig:46:            std.mem.replaceScalar(u8, object_path, '-', '_');
src/apprt/gtk/class/application.zig:36:const SplitTree = @import("split_tree.zig").SplitTree;
src/apprt/gtk/class/application.zig:467:    /// Run the application. This is a replacement for `gio.Application.run`
src/apprt/gtk/class/application.zig:681:            .equalize_splits => return Action.equalizeSplits(target),
src/apprt/gtk/class/application.zig:683:            .goto_split => return Action.gotoSplit(target, value),
src/apprt/gtk/class/application.zig:702:            .new_split => return Action.newSplit(target, value),
src/apprt/gtk/class/application.zig:734:            .resize_split => return Action.resizeSplit(target, value),
src/apprt/gtk/class/application.zig:754:            .toggle_split_zoom => return Action.toggleSplitZoom(target),
src/apprt/gtk/class/application.zig:864:        const unfocused_fill: CoreConfig.Color = config.@"unfocused-split-fill" orelse config.background;
src/apprt/gtk/class/application.zig:867:            \\widget.unfocused-split {{
src/apprt/gtk/class/application.zig:873:            1.0 - config.@"unfocused-split-opacity",
src/apprt/gtk/class/application.zig:879:        if (config.@"split-divider-color") |color| {
src/apprt/gtk/class/application.zig:881:                \\.window .split paned > separator {{
src/apprt/gtk/class/application.zig:1005:            \\.window .split paned > separator {
src/apprt/gtk/class/application.zig:1137:        self.syncActionAccelerator("win.split-right", .{ .new_split = .right });
src/apprt/gtk/class/application.zig:1138:        self.syncActionAccelerator("win.split-down", .{ .new_split = .down });
src/apprt/gtk/class/application.zig:1139:        self.syncActionAccelerator("win.split-left", .{ .new_split = .left });
src/apprt/gtk/class/application.zig:1140:        self.syncActionAccelerator("win.split-up", .{ .new_split = .up });
src/apprt/gtk/class/application.zig:1146:        self.syncActionAccelerator("split-tree.new-split::left", .{ .new_split = .left });
src/apprt/gtk/class/application.zig:1147:        self.syncActionAccelerator("split-tree.new-split::right", .{ .new_split = .right });
src/apprt/gtk/class/application.zig:1148:        self.syncActionAccelerator("split-tree.new-split::up", .{ .new_split = .up });
src/apprt/gtk/class/application.zig:1149:        self.syncActionAccelerator("split-tree.new-split::down", .{ .new_split = .down });
src/apprt/gtk/class/application.zig:1888:        // same, this notification may replace a previous notification
src/apprt/gtk/class/application.zig:1896:                log.warn("equalize splits to app is unexpected", .{});
src/apprt/gtk/class/application.zig:1902:                return surface.as(gtk.Widget).activateAction("split-tree.equalize", null) != 0;
src/apprt/gtk/class/application.zig:1923:                    log.warn("surface is not in a split tree, ignoring goto_split", .{});
src/apprt/gtk/class/application.zig:2110:                log.warn("new split to app is unexpected", .{});
src/apprt/gtk/class/application.zig:2118:                    "split-tree.new-split",
src/apprt/gtk/class/application.zig:2360:                log.warn("resize_split to app is unexpected", .{});
src/apprt/gtk/class/application.zig:2369:                    log.warn("surface is not in a split tree, ignoring resize_split", .{});
src/apprt/gtk/class/application.zig:2373:                // If the tree has no splits (only one leaf), this action is not performable.
src/apprt/gtk/class/application.zig:2387:                        log.warn("unable to resize split, out of memory", .{});
src/apprt/gtk/class/application.zig:2516:                log.warn("toggle_split_zoom to app is unexpected", .{});
src/apprt/gtk/class/application.zig:2527:                    log.warn("surface is not in a split tree, ignoring toggle_split_zoom", .{});
src/apprt/gtk/class/application.zig:2531:                // If the tree has no splits (only one leaf), this action is not performable.
src/apprt/gtk/class/application.zig:2535:                return surface.as(gtk.Widget).activateAction("split-tree.zoom", null) != 0;
src/apprt/gtk/class/application.zig:2729:            // From gtk 4.16, GDK_DEBUG is split into GDK_DEBUG and GDK_DISABLE.
src/apprt/gtk/class/tab.zig:15:const SplitTree = @import("split_tree.zig").SplitTree;
src/apprt/gtk/class/tab.zig:68:        pub const @"split-tree" = struct {
src/apprt/gtk/class/tab.zig:69:            pub const name = "split-tree";
src/apprt/gtk/class/tab.zig:171:        split_tree: *SplitTree,
src/apprt/gtk/class/tab.zig:203:        // Create our initial surface in the split tree.
src/apprt/gtk/class/tab.zig:204:        priv.split_tree.newSplit(.right, null) catch |err| switch (err) {
src/apprt/gtk/class/tab.zig:272:        return priv.split_tree.getTree();
src/apprt/gtk/class/tab.zig:275:    /// Get the split tree widget that is in this tab.
src/apprt/gtk/class/tab.zig:278:        return priv.split_tree;
src/apprt/gtk/class/tab.zig:543:                properties.@"split-tree".impl,
src/apprt/gtk/class/tab.zig:551:            class.bindTemplateChildPrivate("split_tree", .{});
src/apprt/gtk/class/close_confirmation_dialog.zig:196:            .surface => i18n._("The currently running process in this split will be terminated."),
src/apprt/gtk/class/window.zig:26:const SplitTree = @import("split_tree.zig").SplitTree;
src/apprt/gtk/class/window.zig:346:            .init("split-right", actionSplitRight, null),
src/apprt/gtk/class/window.zig:347:            .init("split-left", actionSplitLeft, null),
src/apprt/gtk/class/window.zig:348:            .init("split-up", actionSplitUp, null),
src/apprt/gtk/class/window.zig:349:            .init("split-down", actionSplitDown, null),
src/apprt/gtk/class/window.zig:430:        const split_tree = tab.getSplitTree();
src/apprt/gtk/class/window.zig:432:            split_tree,
src/apprt/gtk/class/window.zig:442:            split_tree,
src/apprt/gtk/class/window.zig:444:            split_tree.getTree(),
src/apprt/gtk/class/window.zig:1828:        self.performBindingAction(.{ .new_split = .right });
src/apprt/gtk/class/window.zig:1836:        self.performBindingAction(.{ .new_split = .left });
src/apprt/gtk/class/window.zig:1844:        self.performBindingAction(.{ .new_split = .up });
src/apprt/gtk/class/window.zig:1852:        self.performBindingAction(.{ .new_split = .down });
src/apprt/gtk/class/command_palette.zig:337:        // Close before running the action in order to avoid being replaced by
src/apprt/gtk/class/surface.zig:292:        pub const @"is-split" = struct {
src/apprt/gtk/class/surface.zig:293:            pub const name = "is-split";
src/apprt/gtk/class/surface.zig:304:                        "is_split",
src/apprt/gtk/class/surface.zig:446:        /// This lets this Surface widget be used as a split, tab, etc.
src/apprt/gtk/class/surface.zig:594:        /// shows up taking the full bounds of a split view.
src/apprt/gtk/class/surface.zig:665:        // True if the current surface is a split, this is used to apply
src/apprt/gtk/class/surface.zig:666:        // unfocused-split-* options
src/apprt/gtk/class/surface.zig:667:        is_split: bool = false,
src/apprt/gtk/class/surface.zig:690:        /// The context for this surface (window, tab, or split)
src/apprt/gtk/class/surface.zig:799:    /// Callback used to determine whether unfocused-split-fill / unfocused-split-opacity
src/apprt/gtk/class/surface.zig:804:        is_split: c_int,
src/apprt/gtk/class/surface.zig:806:        return @intFromBool(focused == 0 and is_split != 0);
src/apprt/gtk/class/surface.zig:1519:        // By the time this is called, we should be in a widget tree.
src/apprt/gtk/class/surface.zig:1622:            var paths = std.mem.splitAny(u8, value, ":");
src/apprt/gtk/class/surface.zig:1715:        // same, this notification may replace a previous notification
src/apprt/gtk/class/surface.zig:2748:        // If this click is only transitioning split focus, suppress it so
src/apprt/gtk/class/surface.zig:3571:            class.bindTemplateCallback("should_unfocused_split_be_shown", &closureShouldUnfocusedSplitBeShown);
src/apprt/gtk/class/surface.zig:3596:                properties.@"is-split".impl,
src/apprt/gtk/class/global_shortcuts.zig:493:        // free to replace all instances of `.` here and avoid extra allocation.
src/apprt/gtk/class/global_shortcuts.zig:494:        std.mem.replaceScalar(u8, object_path, '.', '_');
src/apprt/gtk/class/split_tree.zig:20:const log = std.log.scoped(.gtk_ghostty_split_tree);
src/apprt/gtk/class/split_tree.zig:110:        pub const @"is-split" = struct {
src/apprt/gtk/class/split_tree.zig:111:            pub const name = "is-split";
src/apprt/gtk/class/split_tree.zig:190:            .init("new-split", actionNewSplit, s_variant_type),
src/apprt/gtk/class/split_tree.zig:195:        _ = ext.actions.addAsGroup(Self, self, "split-tree", &actions);
src/apprt/gtk/class/split_tree.zig:198:    /// Create a new split in the given direction from the currently
src/apprt/gtk/class/split_tree.zig:205:    /// if that parent is in this split tree or not. This allows inheriting
src/apprt/gtk/class/split_tree.zig:222:                surface.setParent(core, .split);
src/apprt/gtk/class/split_tree.zig:226:        // Bind is-split property for new surface
src/apprt/gtk/class/split_tree.zig:228:            "is-split",
src/apprt/gtk/class/split_tree.zig:230:            "is-split",
src/apprt/gtk/class/split_tree.zig:251:        // The handle we create the split relative to. Today this is the active
src/apprt/gtk/class/split_tree.zig:255:        // Create our split!
src/apprt/gtk/class/split_tree.zig:256:        var new_tree = try old_tree.split(
src/apprt/gtk/class/split_tree.zig:260:            0.5, // Always split equally for new splits
src/apprt/gtk/class/split_tree.zig:265:            "new split at={} direction={} old_tree={f} new_tree={f}",
src/apprt/gtk/class/split_tree.zig:331:            // since split trees don't use that much memory. The application
src/apprt/gtk/class/split_tree.zig:358:            if (!config.@"split-preserve-zoom".navigation) {
src/apprt/gtk/class/split_tree.zig:424:    /// Returns true if this split tree needs confirmation before quitting based
src/apprt/gtk/class/split_tree.zig:482:    /// This is important because we can only rebuild the widget tree
src/apprt/gtk/class/split_tree.zig:572:            .split => true,
src/apprt/gtk/class/split_tree.zig:622:            log.warn("split-tree.new-split called without a parameter", .{});
src/apprt/gtk/class/split_tree.zig:634:            log.warn("invalid split direction for split-tree.new-split: {s}", .{dir.?});
src/apprt/gtk/class/split_tree.zig:642:            log.warn("new split failed error={}", .{err});
src/apprt/gtk/class/split_tree.zig:881:        // Our split status may have changed
src/apprt/gtk/class/split_tree.zig:882:        self.as(gobject.Object).notifyByPspec(properties.@"is-split".impl.param_spec);
src/apprt/gtk/class/split_tree.zig:890:    /// Builds the widget tree associated with a surface split tree.
src/apprt/gtk/class/split_tree.zig:903:            .split => |s| SplitTreeSplit.new(
src/apprt/gtk/class/split_tree.zig:933:                    .name = "split-tree",
src/apprt/gtk/class/split_tree.zig:943:                properties.@"is-split".impl,
src/apprt/gtk/class/split_tree.zig:966:/// This is an internal-only widget that represents a split in the
src/apprt/gtk/class/split_tree.zig:967:/// split tree. This is a wrapper around gtk.Paned that allows us to handle
src/apprt/gtk/class/split_tree.zig:968:/// ratio (0 to 1) based positioning of the split, and also allows us to
src/apprt/gtk/class/split_tree.zig:969:/// write back the updated ratio to the split tree when the user manually
src/apprt/gtk/class/split_tree.zig:970:/// adjusts the split position.
src/apprt/gtk/class/split_tree.zig:976:/// creation. As such, there are no properties or APIs to change the split,
src/apprt/gtk/class/split_tree.zig:977:/// access the paned, etc.
src/apprt/gtk/class/split_tree.zig:991:        /// The handle of the node in the tree that this split represents.
src/apprt/gtk/class/split_tree.zig:995:        /// Source to handle repositioning the split when properties change.
src/apprt/gtk/class/split_tree.zig:999:        paned: *gtk.Paned,
src/apprt/gtk/class/split_tree.zig:1004:    /// Create a new split.
src/apprt/gtk/class/split_tree.zig:1011:        split: *const Surface.Tree.Split,
src/apprt/gtk/class/split_tree.zig:1019:        // Setup our paned fields
src/apprt/gtk/class/split_tree.zig:1020:        const paned = priv.paned;
src/apprt/gtk/class/split_tree.zig:1021:        paned.setStartChild(start_child);
src/apprt/gtk/class/split_tree.zig:1022:        paned.setEndChild(end_child);
src/apprt/gtk/class/split_tree.zig:1023:        paned.as(gtk.Orientable).setOrientation(switch (split.layout) {
src/apprt/gtk/class/split_tree.zig:1048:        const paned = priv.paned;
src/apprt/gtk/class/split_tree.zig:1053:        // Get our split. This is the most dangerous part of this entire
src/apprt/gtk/class/split_tree.zig:1056:        // the handle is always a split node.
src/apprt/gtk/class/split_tree.zig:1057:        const split_tree = ext.getAncestor(
src/apprt/gtk/class/split_tree.zig:1061:        const tree = split_tree.getTree() orelse return 0;
src/apprt/gtk/class/split_tree.zig:1062:        const split: *const Surface.Tree.Split = &tree.nodes[priv.handle.idx()].split;
src/apprt/gtk/class/split_tree.zig:1065:        const pos = paned.getPosition();
src/apprt/gtk/class/split_tree.zig:1070:                paned.as(gobject.Object),
src/apprt/gtk/class/split_tree.zig:1080:                paned.as(gobject.Object),
src/apprt/gtk/class/split_tree.zig:1090:                paned.as(gobject.Object),
src/apprt/gtk/class/split_tree.zig:1103:        // split completely minimized.
src/apprt/gtk/class/split_tree.zig:1112:        const desired_ratio: f64 = @floatCast(split.ratio);
src/apprt/gtk/class/split_tree.zig:1115:        // we ignore the update. This is to avoid constant split updates
src/apprt/gtk/class/split_tree.zig:1135:            paned.setPosition(desired_pos);
src/apprt/gtk/class/split_tree.zig:1220:                    .name = "split-tree-split",
src/apprt/gtk/class/split_tree.zig:1225:            class.bindTemplateChildPrivate("paned", .{});

## Links

- [Article](https://ampcode.com/threads/T-019cbadf-cb5a-742e-b0e3-2d7164de743f)
- [Original Tweet](https://x.com/mitchellh/status/2029348087538565612)
