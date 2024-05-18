#!/usr/bin/env node
import inquirer from "inquirer";
async function main() {
    let condition = true;
    while (condition) {
        const user1acc = 12345;
        const user2acc = 3645;
        const user3acc = 3556;
        const user4acc = 5412;
        const operation = await inquirer.prompt([
            {
                name: "askaccno",
                type: "input",
                message: "Enter your account number:",
            }
        ]);
        const userAcc = parseInt(operation.askaccno);
        if ([user1acc, user2acc, user3acc, user4acc].includes(userAcc)) {
            while (true) {
                const userOperation = await inquirer.prompt([
                    {
                        name: "options",
                        type: "list",
                        message: "What would you like to do?",
                        choices: ["Deposit", "Withdraw", "Check Balance", "My account information", "Exit"]
                    }
                ]);
                class Bank {
                    accountBalance;
                    constructor(accountBalance) {
                        this.accountBalance = accountBalance;
                    }
                    deposit(amount) {
                        if (amount <= 0) {
                            console.log("Invalid deposit amount.");
                        }
                        else {
                            this.accountBalance += amount;
                            console.log(`Transaction Successful. Your new Account Balance is ${this.accountBalance}`);
                        }
                    }
                    withdraw(amount) {
                        if (amount <= 0) {
                            console.log("Invalid withdrawal amount.");
                        }
                        else if (amount > this.accountBalance) {
                            console.log("Insufficient Balance.");
                        }
                        else {
                            this.accountBalance -= amount;
                            console.log(`Transaction Successful. Your new Account Balance is ${this.accountBalance}`);
                        }
                    }
                    checkBalance() {
                        console.log(`Your current Account Balance is ${this.accountBalance}`);
                    }
                }
                const userBank = new Bank(10000);
                if (userOperation.options === "Deposit") {
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input",
                            message: "Enter amount to deposit:",
                        }
                    ]);
                    userBank.deposit(parseFloat(depositAmount.amount));
                }
                else if (userOperation.options === "Withdraw") {
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input",
                            message: "Enter amount to withdraw:",
                        }
                    ]);
                    userBank.withdraw(parseFloat(withdrawAmount.amount));
                }
                else if (userOperation.options === "Check Balance") {
                    userBank.checkBalance();
                }
                else if (userOperation.options === "My account information") {
                    const userInfos = {
                        12345: { firstName: "Yusra", lastName: "Fatima", age: 19, gender: "Female", mobileNumber: 3345245682 },
                        3645: { firstName: "Jones", lastName: "Marines", age: 45, gender: "Male", mobileNumber: 3254623541 },
                        3556: { firstName: "William", lastName: "Butler", age: 50, gender: "Male", mobileNumber: 3577154482 },
                        5412: { firstName: "Julia", lastName: "Richards", age: 22, gender: "Female", mobileNumber: 3345216523 }
                    };
                    const userInfo = userInfos[userAcc];
                    class GetInfo {
                        firstName;
                        lastName;
                        gender;
                        age;
                        mobileNumber;
                        constructor(firstName, lastName, gender, age, mobileNumber) {
                            this.firstName = firstName;
                            this.lastName = lastName;
                            this.gender = gender;
                            this.age = age;
                            this.mobileNumber = mobileNumber;
                        }
                        displayInfo() {
                            console.log(`User Info: First Name: ${this.firstName}, Last Name: ${this.lastName}, Gender: ${this.gender}, Age: ${this.age}, Mobile Number: ${this.mobileNumber}`);
                        }
                    }
                    const userInfoInstance = new GetInfo(userInfo.firstName, userInfo.lastName, userInfo.gender, userInfo.age, userInfo.mobileNumber);
                    userInfoInstance.displayInfo();
                }
                else if (userOperation.options === "Exit") {
                    condition = false;
                    break;
                }
            }
        }
        else {
            console.log("Invalid account number.");
        }
    }
}
main();
