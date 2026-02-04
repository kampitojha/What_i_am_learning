#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <process.h> // For _spawnvp on Windows
#include <direct.h>  // For _chdir, _getcwd on Windows

#define TOKEN_DELIMITERS " \t\r\n\a"

// Function Declarations
void loop();
char *read_line();
char **split_line(char *line);
int execute(char **args);
int launch_process(char **args);

// Built-in function declarations
int shell_cd(char **args);
int shell_help(char **args);
int shell_exit(char **args);
int shell_cls(char **args);

// List of built-in commands
char *builtin_str[] = {
    "cd",
    "help",
    "exit",
    "cls"
};

int (*builtin_func[]) (char **) = {
    &shell_cd,
    &shell_help,
    &shell_exit,
    &shell_cls
};

int num_builtins() {
    return sizeof(builtin_str) / sizeof(char *);
}

/*
  Built-in function implementations.
*/

int shell_cd(char **args) {
    if (args[1] == NULL) {
        fprintf(stderr, "myshell: expected argument to \"cd\"\n");
    } else {
        if (_chdir(args[1]) != 0) {
            perror("myshell");
        }
    }
    return 1;
}

int shell_help(char **args) {
    printf("Simple C Shell\n");
    printf("Type program names and arguments, and hit enter.\n");
    printf("The following are built in:\n");

    for (int i = 0; i < num_builtins(); i++) {
        printf("  %s\n", builtin_str[i]);
    }

    printf("Use the man command for information on other programs.\n");
    return 1;
}

int shell_exit(char **args) {
    return 0;
}

int shell_cls(char **args) {
    system("cls");
    return 1;
}

/*
  Launching a program using Windows _spawnvp.
  This is the 'low-level' part where we ask the OS to run a new process.
*/
int launch_process(char **args) {
    // _spawnvp(mode, cmdname, argv)
    // _P_WAIT: Parent process waits for the child to finish.
    // This effectively replaces the fork() + exec() + waitpid() pattern in Unix.
    int status = _spawnvp(_P_WAIT, args[0], (const char * const *)args);

    if (status == -1) {
        printf("Error: Command not found or execution failed.\n");
        // perror("myshell"); // Optional: for more detailed error code
    }

    return 1;
}

/*
  Execute shell built-in or launch program.
  return 1 if the shell should continue running, 0 if it should terminate
*/
int execute(char **args) {
    int i;

    if (args[0] == NULL) {
        // An empty command was entered.
        return 1;
    }

    // Check for built-ins
    for (i = 0; i < num_builtins(); i++) {
        if (strcmp(args[0], builtin_str[i]) == 0) {
            return (*builtin_func[i])(args);
        }
    }

    return launch_process(args);
}

/*
  Read a line of input from stdin.
*/
char *read_line(void) {
    char *line = NULL;
    size_t bufsize = 0; // standard getline will allocate buffer

    // Since Windows (MinGW) might not have getline, we use fgets safely
    // or implement a simple dynamic reader.
    // For simplicity in this "low level" intro, we'll use a fixed buffer then strdup,
    // or a simple dynamic expansion loop to be robust.
    
    int buffer_size = 1024;
    int position = 0;
    char *buffer = malloc(sizeof(char) * buffer_size);
    int c;

    if (!buffer) {
        fprintf(stderr, "myshell: allocation error\n");
        exit(EXIT_FAILURE);
    }

    while (1) {
        // Read a character
        c = getchar();

        // If we hit EOF, replace it with a null character and return.
        if (c == EOF || c == '\n') {
            buffer[position] = '\0';
            return buffer;
        } else {
            buffer[position] = c;
        }
        position++;

        // If we have exceeded the buffer, reallocate.
        if (position >= buffer_size) {
            buffer_size += 1024;
            buffer = realloc(buffer, buffer_size);
            if (!buffer) {
                fprintf(stderr, "myshell: allocation error\n");
                exit(EXIT_FAILURE);
            }
        }
    }
}

/*
  Split a line into tokens (very naive parsing).
*/
char **split_line(char *line) {
    int bufsize = 64, position = 0;
    char **tokens = malloc(bufsize * sizeof(char*));
    char *token;

    if (!tokens) {
        fprintf(stderr, "myshell: allocation error\n");
        exit(EXIT_FAILURE);
    }

    token = strtok(line, TOKEN_DELIMITERS);
    while (token != NULL) {
        tokens[position] = token;
        position++;

        if (position >= bufsize) {
            bufsize += 64;
            tokens = realloc(tokens, bufsize * sizeof(char*));
            if (!tokens) {
                fprintf(stderr, "myshell: allocation error\n");
                exit(EXIT_FAILURE);
            }
        }

        token = strtok(NULL, TOKEN_DELIMITERS);
    }
    tokens[position] = NULL;
    return tokens;
}

/*
  Main Loop.
*/
void loop(void) {
    char *line;
    char **args;
    int status;
    char cwd[1024];

    do {
        // Print usage prompt with current directory
        if (_getcwd(cwd, sizeof(cwd)) != NULL) {
             printf("%s> ", cwd);
        } else {
             printf("> ");
        }
        fflush(stdout);
        
        line = read_line();
        args = split_line(line);
        status = execute(args);

        free(line);
        free(args);
    } while (status);
}

int main(int argc, char **argv) {
    // Load config files, if any.

    // Run command loop.
    loop();

    // Perform any shutdown/cleanup.
    return EXIT_SUCCESS;
}
