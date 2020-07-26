/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package desafiointelie;

import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;
/*
import java.util.logging.Level;
import java.util.logging.Logger;
*/
/**
 *
 * @author fabiolinux
 */
public class Parser {

    public static void teste() {
        System.out.println("Teste");
        try {
            Socket client = new Socket("0.0.0.0", 9999);
            System.out.println("Conectado");
            Scanner receivedStream = new Scanner(client.getInputStream());
            
            while (receivedStream.hasNextLine()) {
                System.out.println(receivedStream.nextLine());
            }
            
            System.out.println("Closing stream ...");
            
            try {
                receivedStream.close();
                System.out.println("Stream closed");
            } catch (Exception e) {
                System.out.println("Error on closing connection ".concat(Parser.class.getName()));
                System.out.println("Cause ".concat(e.getMessage()));
                System.out.println("Trying to close connection ...");
            }
            
            System.out.println("Closing connection ...");
            
            try {
                client.close();
                System.out.println("Closed");
            } catch (IOException e) {
                System.out.println("Could not close connection on ".concat(Parser.class.getName()));
                System.out.println("Cause: ".concat(e.getMessage()));
                return;
            }
            
        } catch (IOException ex) {
            //Logger.getLogger(Parser.class.getName()).log(Level.WARNING, null, ex);
            System.out.println("Erro na classe: ".concat(Parser.class.getName()));
            System.out.println("Com a mensagem: ".concat(ex.getMessage()));
            return;
        }
        System.out.println("Exiting success");
    }

    /**
     *
     */
    public static void teste2() {
        Scanner scan= new Scanner(System.in);

        String text= scan.nextLine();

        System.out.println(text);


        int num=scan.nextInt();

        System.out.println(num);
    }
}
