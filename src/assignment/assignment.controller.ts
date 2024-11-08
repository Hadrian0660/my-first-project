import { Controller, Get, Param } from '@nestjs/common';

@Controller('assignment')
export class AssignmentController {

  @Get('fibonacci/:n')
  getFibonacci(@Param('n') n: string): { sequence: number[] } {
    // Convert the parameter to a number
    const num = parseInt(n, 10);

    // Handle case where n is less than or equal to 0
    if (num <= 0) {
      return { sequence: [] }; // Return an empty array if n <= 0
    }

    // Calculate the Fibonacci sequence
    const fibonacciSequence = this.calculateFibonacci(num);

    return { sequence: fibonacciSequence };
  }

  // Helper method to calculate Fibonacci numbers
  private calculateFibonacci(n: number): number[] {
    const sequence = [0, 1];

    // If n is 1, we only need the first element
    if (n === 1) return [0];

    // Generate Fibonacci sequence up to the nth number
    for (let i = 2; i < n; i++) {
      const nextNum = sequence[i - 1] + sequence[i - 2];
      sequence.push(nextNum);
    }

    return sequence;
  }
  @Get('prime/:number')
  checkPrime(@Param('number') number: string): { isPrime: boolean } {
    // Convert the parameter to a number
    const num = parseInt(number, 10);

    // Handle invalid input, if it's not a number
    if (isNaN(num)) {
      return { isPrime: false }; // Return false if the input is not a valid number
    }

    // Check if the number is prime
    const result = this.isPrime(num);

    return { isPrime: result };
  }

  // Helper method to check if a number is prime
  private isPrime(n: number): boolean {
    if (n <= 1) {
      return false; // 0 and 1 are not prime numbers
    }
    if (n === 2) {
      return true; // 2 is a prime number
    }
    if (n % 2 === 0) {
      return false; // Eliminate even numbers greater than 2
    }

    // Only check for factors from 3 to sqrt(n) (step by 2 to skip even numbers)
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        return false; // n is divisible by i, so it's not prime
      }
    }

    return true; // If no factors were found, the number is prime
  }
  // Define the GET endpoint for factorial
  @Get('factorial/:number')
  getFactorial(@Param('number') number: string): { factorial: number | string } {
    // Convert the parameter to a number
    const num = parseInt(number, 10);

    // Check if the number is a valid integer
    if (isNaN(num)) {
      return { factorial: 'Invalid input, please provide a valid number' };
    }

    // Check for negative input, as factorial is undefined for negative numbers
    if (num < 0) {
      return { factorial: 'Factorial is not defined for negative numbers' };
    }

    // Calculate the factorial of the number
    const result = this.calculateFactorial(num);

    return { factorial: result };
  }

  // Helper method to calculate factorial using iteration (for efficiency)
  private calculateFactorial(n: number): number {
    if (n === 0 || n === 1) {
      return 1; // 0! = 1 and 1! = 1
    }

    let factorial = 1;
    for (let i = 2; i <= n; i++) {
      factorial *= i;
    }

    return factorial;
  }
}
