package desafiointelie;

import java.io.IOException;

/**
 *
 * @author Fabio Pereira
 */
public class Client {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)  {

        String inputStream, jsonResult;
        Connector con = new Connector("0.0.0.0", 9999);
        OpenFile fileStream = new OpenFile("teste.txt");
       
        jsonResult = Parser.toJsonStringLine("2020-07-26T17:01:58.890Z,549,-0.156434,\"(a=1000100111000011,b=f48812ab-00ecaa11::f48812ab51eeaa33;c=f49903ba)\"");

        if (jsonResult != null) {
            System.out.println(jsonResult);
        } else {
            System.out.println(Parser.errMsg);
        }
        
        if (!fileStream.openFile()) {
            System.out.println("Error when opening file: ".concat(fileStream.getError()));
            return;
        }
        
        if (!con.connect('q')) {
            System.out.println(con.getError());
            System.out.println(con.getErrorMessage());
            return;
        }
        
        try {
            while ((inputStream = con.readStream()) != null) {
                System.out.println(inputStream);
                if (!fileStream.appendLine(inputStream.concat("\n"))) {
                    System.out.println("Error. Can't append line: ".concat(fileStream.getError()));
                    System.out.println("Aborting ...");
                    break;
                }
            }
        } catch (IOException e) {
            System.out.println("Fatal error: ".concat(e.getMessage()));
        }
        
        if (!fileStream.closeFile())
            System.out.println("Can't save and close file ".concat(fileStream.getError()));
        
        if (!con.close()) {
            System.out.println(con.getError());
            System.out.println(con.getErrorMessage());
        }
       
    }
   
}
