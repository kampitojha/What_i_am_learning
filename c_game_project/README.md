# Simple Snake Game in C

This is a classic Snake game implementation in C designed for Windows.

## Features

- **Smooth Rendering**: Uses Windows Console API to draw the game board without screen flickering.
- **Classic Controls**: Use `W`, `A`, `S`, `D` to control the snake.
- **Scoring**: Eat the 'F' (Fruit) to grow and gain points.
- **Game Over**: Avoiding hitting the walls or yourself!

## How to Compile & Run

### Prerequisites

- GCC Compiler (MinGW on Windows)

### Steps

1.  Open your terminal in this directory.
2.  Compile the game:
    ```bash
    gcc main.c -o snake_game.exe
    ```
3.  Run the game:
    ```bash
    ./snake_game.exe
    ```

## Controls

- `W`: Move Up
- `A`: Move Left
- `S`: Move Down
- `D`: Move Right
- `X`: Quit game
