# Intelie Challenge (JAVA)

## Convert a CSV stream to JSONL text

Process a CSV like data stream through TCP and append it in a file as JSON lines.

## Requirements

- ant 1.10.5 or higher
- Java SDK 11 (openjdk-11)

## Installing requirements

In Ubuntu 18.04

```sh
sudo apt install openjdk-11-jdk ant
```

## Downloading, compiling and running

First git clone and compile:

```sh
git clone https://github.com/devfabiosilva/desafios-intelie.git && cd desafios-intelie/04 && ant
```

### Running

After dowloading and compiling type:

```sh
cd dist
```

```sh
java -jar desafioIntelie.jar
```

It will try to connect to TCP address 0.0.0.0 with port 9999 and will create a file _record.txt_

```sh
Creating file ...
File record.txt created successfully
Begin recording data
Creating Socket ...
Client connected to 0.0.0.0 port: 9999
Creating stream
Stream created
Creating stream for Keyborad Reading
Keyboard stream reader created
Press "q" + <ENTER> to quit
```

Optionally you can run selecting parameters.

```sh
java -jar desafioIntelie.jar -a <ADDRESS> -p <PORT> -f <FILE>
```

#### Example:

```sh
java -jar desafioIntelie.jar -a 82.11.20.01 -p 9998 -f myFileRecord.txt
```

```sh
Creating file ...
File myFileRecord.txt created successfully
Begin recording data
Creating Socket ...
Client connected to 82.11.20.01 port: 9998
Creating stream
Stream created
Creating stream for Keyborad Reading
Keyboard stream reader created
Press "q" + <ENTER> to quit
```

### Source code documentation

Documentation of the source code can be found [here](https://devfabiosilva.github.io/desafios-intelie)

