package desafiointelie;

import java.io.IOException;

public class Main {

    public static void main(String[] args)  {

        String inputStream, jsonResult;
        final String defaultFileName = "record.txt";
        final String defaultAddress = "0.0.0.0";
        final int defaultPort = 9999;
        int error;
        Connector con;
        OpenFile fileStream;
        
        error = CommandParser.parseCommandLine(args, defaultAddress, defaultPort, defaultFileName);
        
        if (error > 0) {
            System.out.println(CommandParser.errMsg);
            return;
        }
        
        if (error < 0) {
            System.out.println("SHOW HELP");
            return;
        }
        
        fileStream = new OpenFile(CommandParser.fileName);
       
        if (!fileStream.openFile()) {
            System.out.println("Error when opening file: ".concat(fileStream.getError()));
            return;
        }
        
        con = new Connector(CommandParser.addressName, CommandParser.port);
        
        if (!con.connect('q')) {
            System.out.println(con.getError());
            System.out.println(con.getErrorMessage());
            fileStream.closeFile();
            return;
        }
        
        try {
            while ((inputStream = con.readStream()) != null) {

                jsonResult = Parser.toJsonStringLine(inputStream);
                
                if (jsonResult == null) {
                    System.out.println("Ignoring line ".concat(String.valueOf(fileStream.getLines()+1)));
                    System.out.println("Reason: ".concat(Parser.errMsg));
                    continue;
                }
                
                if (!fileStream.appendLine(jsonResult.concat("\n"))) {
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
       
        System.out.println("Recorded "
                .concat(String.valueOf(fileStream.getLines())
                    .concat(" lines"))
                .concat(" to file ".concat(CommandParser.fileName)));
    }
   
}
