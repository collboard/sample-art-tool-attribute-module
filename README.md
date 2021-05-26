# Sample of Collboard module with tool, art, and attributes

Simple sample module for [Collboard.com](https://collboard.com/) created via [@collboard/modules-sdk](https://www.npmjs.com/package/@collboard/modules-sdk).

To start work, first `npm install` dependencies and then run `colldev` CLI util:

```bash
# Linux, WSL
colldev

# Windows, PowerShell
npx colldev
```

Colldev will automatically look into the [package.json](./package.json) find **main** entry _(it can be typescript or javascript file)_. And watch, build and serve changes to Collboard in development mode.

Then you open [Collboard in developer mode - dev.collboard.com](https://dev.collboard.com) and there you will see modules that you are working on.

Most of the modules make sense on the board (not the homepage) **so you will probably need to create a new board**.

These modules will be automatically installed & hot reloaded _(uninstalled+installed)_ as you go.

Notice that boards+its contents created under development mode will be automatically erased after some time.

## Types of modules in Collboard

You can create pretty much anything as a module as long as it follows some [basic rules](https://github.com/collboard/modules-sdk#3-create-the-main-file). We have, however, prepaired a list of few most common module types which you should start with:

### Arts

We call art anything, that gets synchronized to all users on a single board. Art can be anything including the more obvious ones, like [freehand drawing](src/SampleArt.tsx), images or HTML content all the way to the less obvious ones, like chat messages, module syncers, information about connected users or a [cornerstone art](https://collboard.github.io/modules-sdk/classes/cornerstoneart.html), which keeps basic information about each board.

All arts must extend a [`AbstractArt`](https://collboard.github.io/modules-sdk/classes/abstractart.html) class or one of the more specific ones, like [`Abstract2dBoxArt`](https://collboard.github.io/modules-sdk/classes/abstract2dboxart.html) (see Hierarchy).

Some art types get rendered (everything extending `Abstract2dArt` will get rendered as a part of board canvas), some only hold information for the application (eg. [cornerstone art](https://collboard.github.io/modules-sdk/classes/cornerstoneart.html)) and don't get rendered by default. You can, however, create your own renderers for a specific group of arts.

When you decide to create your first art module, you should decide, which kind of art you plan to implement and that should lead to a decision on which class you should extend.

To turn your class into a module, use [`makeArtModule`](https://collboard.github.io/modules-sdk/modules.html#makeartmodule) maker. You only need to specify the class itself and a unique `name` identifier used for serialization.

**Important:** Please create a prefix for your art module names since they need to be unique across the whole system. If the name is not unique, it may cause confusion and the system may not work correctly!

### Attributes

!!! TODO

### Tools

!!! TODO
