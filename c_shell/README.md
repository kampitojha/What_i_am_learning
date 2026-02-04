# Simple C Shell

This project is a simple command-line interpreter (shell) written in C. Building a shell is a classic project for systems programming that introduces you to:

1.  **Process Management**: How the OS starts and manages programs.
2.  **System Calls**: Interacting directly with the Operating System kernel.
3.  **Memory Management**: Parsing strings and managing buffers.

## How it works

A shell basically runs in a generic `REPL` loop:

1.  **Read**: Read a command line from the user.
2.  **Parse**: Split the string into program name and arguments.
3.  **Execute**: call the OS to run the command.

## Windows vs Linux

On **Linux/Unix**, shells typically use:

- `fork()`: To create a copy of the current process.
- `execvp()`: To replace the current process image with a new program.
- `waitpid()`: To wait for the child process to finish.

On **Windows** (which we are using), `fork()` does not exist in the same way. Instead, we use:

- `_spawnvp()`: A function from the C Runtime provided by MinGW/Visual Studio that spawns a new process and executes a file.
- Or `CreateProcess()`: The raw Windows API (more complex).

We will use `_spawnvp` for simplicity while still keeping it low-level C.

## Compilation

To compile this shell, open your terminal in this directory and run:

```bash
gcc simple_shell.c -o myshell
```

Then run it:

```bash
./myshell
```
