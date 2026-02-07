#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>
#include <time.h>

#define WIDTH 40
#define HEIGHT 20

// Global variables
int x, y, fruitX, fruitY, score;
int tailX[1000], tailY[1000]; 
int nTail;
enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };
enum eDirection dir;
int gameOver;

void Setup() {
    gameOver = 0;
    dir = STOP;
    x = WIDTH / 2;
    y = HEIGHT / 2; // Fixed start position
    
    // Ensure randomly placed fruit is within bounds
    fruitX = rand() % (WIDTH - 2) + 1; // 1 to WIDTH-2
    fruitY = rand() % (HEIGHT - 2) + 1; // 1 to HEIGHT-2
    
    score = 0;
    nTail = 0;
    
    // Clear screen once at the beginning
    system("cls");
}

void Draw() {
    // Move cursor to top-left corner instead of clearing screen to avoid flicker
    COORD coord;
    coord.X = 0;
    coord.Y = 0;
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hConsole, coord);

    // Hide cursor 
    CONSOLE_CURSOR_INFO info;
    info.dwSize = 100;
    info.bVisible = FALSE;
    SetConsoleCursorInfo(hConsole, &info);

    // Draw Top Border
    for (int i = 0; i < WIDTH + 2; i++)
        printf("#");
    printf("\n");

    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            if (j == 0)
                printf("#"); // Left Border
            
            if (i == y && j == x)
                printf("O"); // Snake Head
            else if (i == fruitY && j == fruitX)
                printf("F"); // Fruit
            else {
                int print = 0;
                for (int k = 0; k < nTail; k++) {
                    if (tailX[k] == j && tailY[k] == i) {
                        printf("o"); // Snake Body
                        print = 1;
                    }
                }
                if (!print)
                    printf(" "); // Empty space
            }

            if (j == WIDTH - 1)
                printf("#"); // Right Border
        }
        printf("\n");
    }

    // Draw Bottom Border
    for (int i = 0; i < WIDTH + 2; i++)
        printf("#");
    printf("\n");

    printf("Score: %d\n", score);
    printf("Use W, A, S, D to move. X to quit.\n");
    
    // Force output to display immediately
    fflush(stdout); 
}

void Input() {
    if (_kbhit()) {
        switch (_getch()) {
        case 'a':
        case 'A':
            if(dir != RIGHT) dir = LEFT;
            break;
        case 'd':
        case 'D':
            if(dir != LEFT) dir = RIGHT;
            break;
        case 'w':
        case 'W':
            if(dir != DOWN) dir = UP;
            break;
        case 's':
        case 'S':
            if(dir != UP) dir = DOWN;
            break;
        case 'x':
        case 'X':
            gameOver = 1;
            break;
        }
    }
}

void Logic() {
    // Save previous tail position
    int prevX = tailX[0];
    int prevY = tailY[0];
    int prev2X, prev2Y;
    tailX[0] = x;
    tailY[0] = y;

    for (int i = 1; i < nTail; i++) {
        prev2X = tailX[i];
        prev2Y = tailY[i];
        tailX[i] = prevX;
        tailY[i] = prevY;
        prevX = prev2X;
        prevY = prev2Y;
    }

    // Move head
    switch (dir) {
    case LEFT:
        x--;
        break;
    case RIGHT:
        x++;
        break;
    case UP:
        y--;
        break;
    case DOWN:
        y++;
        break;
    default:
        break;
    }

    // Wall Collision (Game Over)
    if (x >= WIDTH || x < 0 || y >= HEIGHT || y < 0)
        gameOver = 1;

    // Self Collision
    for (int i = 0; i < nTail; i++)
        if (tailX[i] == x && tailY[i] == y)
            gameOver = 1;

    // Fruit Eating
    if (x == fruitX && y == fruitY) {
        score += 10;
        fruitX = rand() % (WIDTH - 2) + 1;
        fruitY = rand() % (HEIGHT - 2) + 1;
        nTail++;
    }
}

int main() {
    // Disable output buffering to ensure smooth display
    setbuf(stdout, NULL);
    
    srand((unsigned int)time(NULL)); 
    Setup();
    
    while (!gameOver) {
        Draw();
        Input();
        Logic();
        Sleep(100); 
    }
    
    // Game Over
    system("cls");
    printf("\n\n\tGame Over! Final Score: %d\n", score);
    printf("\tPress any key to exit...\n");
    
    while (_kbhit()) _getch(); // Clear buffer
    _getch(); // Wait for input
    
    return 0;
}
