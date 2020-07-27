package desafiointelie;

import java.io.IOException;

public class Client {

    public static void main(String[] args)  {

        int line;
        String inputStream, jsonResult;
        Connector con = new Connector("0.0.0.0", 9999);
        OpenFile fileStream = new OpenFile("teste.txt");
       
        //jsonResult = Parser.toJsonStringLine("2020-07-26T17:01:58.890Z,549,-0.156434,\"(a=1000100111000011,b=f48812ab-00ecaa11::f48812ab51eeaa33;c=f49903ba)\"");

        
        if (!fileStream.openFile()) {
            System.out.println("Error when opening file: ".concat(fileStream.getError()));
            return;
        }
        
        if (!con.connect('q')) {
            System.out.println(con.getError());
            System.out.println(con.getErrorMessage());
            return;
        }
        
        line = 1;
        
        try {
            while ((inputStream = con.readStream()) != null) {

                jsonResult = Parser.toJsonStringLine(inputStream);
                
                if (jsonResult == null) {
                    System.out.println("Ignoring line ".concat(String.valueOf(line)));
                    System.out.println("Reason: ".concat(Parser.errMsg));
                    continue;
                }
                
                if (!fileStream.appendLine(jsonResult.concat("\n"))) {
                    System.out.println("Error. Can't append line: ".concat(fileStream.getError()));
                    System.out.println("Aborting ...");
                    break;
                }
                
                line++;
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
       
        System.out.println("Recorded ".concat(String.valueOf(line).concat(" lines")));
    }
   
}
