package desafiointelie;

import java.util.regex.Pattern;

/**
 * Parser of CLI input arguments
 */
public class CommandParser {
   /**
    * Default port number or CLI command parsed port number.
    */
   public static int port = -1;
   
   /**
    * Default file name or CLI command parsed file name.
    */
   public static String fileName = null;
   
   /**
    * Default address or CLI command parsed address.
    */
   public static String addressName = null;
   
   /**
    * Error message in class CommandParser.
    */
   public static String errMsg = "";

   /**
    * Checks if string address has a valid TCP address.
    * <p>
    * @return true if is valid otherwise returns false
    */
   private static boolean validTCPAddress(String address) {
       // source: http://ipregex.com/

       Pattern pattern = Pattern.compile("(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)");
       return pattern.matcher(address).matches();
   }

   /**
    * Parses valid command line (if exists)
    * <p>
    * @param args String array of input CLI arguments
    * @param defaultAddress Default TCP address
    * @param defaultPort Default port
    * @param defaultFileName Default file name
    * <p>
    * @return 0 if success, greater than zero if error or less than zero if help (-h)
    */
   public static int parseCommandLine(
           String[] args,
           String defaultAddress,
           int defaultPort,
           String defaultFileName) {
       
       int i, argLength;
       String compare;
       
       argLength = args.length;
       
       for (i = 0; i < argLength; i++) {
           
           compare = args[i];
           
           if (compare.compareTo("-f") == 0) {
               if ((++i) == argLength) {
                   errMsg = "Missing file";
                   return 1;
               }
               
               fileName = args[i].trim();
               continue;
           }
           
           if (compare.compareTo("-a") == 0) {
               if ((++i) == argLength) {
                   errMsg = "Missing TCP address";
                   return 2;
               }
               
               defaultAddress = args[i].trim();
               
               if (!validTCPAddress(defaultAddress)) {
                   errMsg = "Invalid TCP address";
                   return 20;
               }
               
               continue;
           }
           
           if (compare.compareTo("-p") == 0) {
               if ((++i) == argLength) {
                   errMsg = "Missing TCP port";
                   return 3;
               }
               
               if (!Parser.isNumericPositiveInteger(args[i])) {
                   errMsg = "TCP port is not a valid number";
                   return 4;
               }
               
               port = Integer.valueOf(args[i]);
               
               continue;
           }
           
           if (compare.compareTo("-h") == 0) {
               if (argLength != 1) {
                   errMsg = "Too many arguments";
                   return 5;
               }
               
               return -1;
           }
           
           errMsg = "Unknown parameter: "
                   .concat(args[i])
                   .concat(". Type -h for HELP.");
           return 6;
       }
       
       if (port < 0)
           port = defaultPort;
       
       if (addressName == null)
           addressName = defaultAddress;
       
       if (fileName == null)
           fileName = defaultFileName;
       else if (fileName.length() == 0) {
           errMsg = "Filename is empty string";
           return 30;
       }
       
       return 0;
   }
}
