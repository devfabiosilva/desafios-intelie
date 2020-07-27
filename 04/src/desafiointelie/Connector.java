package desafiointelie;

import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;

/**
 * Connects this APP to TCP server.
 */
public class Connector {
    private String error = "";
    private String errorMessage = "";
    private String address = "";
    private final int port;
    private Scanner receivedStream, kbd;
    private Socket client;
    private char quitChar;
    
    /**
     * Initializes connection to TCP server.
     * <p>
     * @param address Address. Ex.: 12.01.82.02
     * @param port Port. Ex.: 9999
     */
    Connector(String address, int port) {
        this.address = address;
        this.port = port;
    }
    
    /**
     * Connect to TCP server.
     * 
     * @param quittingChar Char to quit application. If '\0' application will close only with CTRL+C or if connection is finished
     * @return true if connection Success or false otherwise
     * @see getError()
     * @see getErrorMessage()
     */
    public boolean connect(char quittingChar) {

        try {
            System.out.println("Creating Socket ...");
            this.client = new Socket(this.address, this.port);
            System.out.println(
                    "Client connected to "
                            .concat(this.address)
                            .concat(" port: "
                                    .concat(Integer.toString(port))
                            ));
            System.out.println("Creating stream");
            this.receivedStream = new Scanner(client.getInputStream());
            System.out.println("Stream created");

            if (quittingChar != '\0') {
                this.quitChar = quittingChar;
                System.out.println("Creating stream for Keyborad Reading");
                this.kbd = new Scanner(System.in);
                System.out.println("Keyboard stream reader created");
                System.out.println("Press \""
                        .concat(String.valueOf(quittingChar))
                        .concat("\" + <ENTER> to quit"));
            }
            
        } catch (IOException ex) {

           this.error = "Class error: ".concat(Connector.class.getName());
           this.errorMessage = "With message: ".concat(ex.getMessage());
           return false;
        }
        return true;
    }
    /**
     * Gets last error of the connection.
     * @return Error text containing error.
     */
    public String getError() {
        return this.error;
    }
    
    /**
     * Gets last error message of the connection
     * @return Error message
     */
    public String getErrorMessage() {
        return this.errorMessage;
    }
    /**
     * Reads a stream from connected server
     * <p>
     * @return String containing received data if success. null|IOException if error occurs.
     * @throws IOException 
     */
    public String readStream() throws IOException {
        
        if (this.quitChar != '\0') {
            if (System.in.available() != 0) {

                if (this.quitChar == this.kbd.next().charAt(0))
                    return null;
            }
        }

        if (this.receivedStream.hasNextLine())
            return this.receivedStream.nextLine();
        
       return null;
    }
    /**
     * Close connection to server.
     * @return true if connection is close successfully otherwise returns false
     */
    public boolean close() {
        System.out.println("Closing stream ...");
            
        try {
            receivedStream.close();
            System.out.println("Stream closed");
        } catch (Exception e) {
            this.error = "Error on closing connection ".concat(Connector.class.getName());
            this.errorMessage = "Cause ".concat(e.getMessage());
            System.out.println("Trying to close connection ...");
        }
            
        System.out.println("Closing connection ...");
            
        try {
            client.close();
            System.out.println("Closed");
        } catch (IOException e) {
            this.error = "Could not close connection on ".concat(Connector.class.getName());
            this.errorMessage = "Cause: ".concat(e.getMessage());
            return false;
        }
        return true;
    }
}
