package desafiointelie;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Pattern;

/** 
  * Class containing utilities to parse input CSV stream line to JSON line.
  */
public class Parser {
    /**
     * Error description variable in Parser class.
     * 
     * All error description string is Parser class are stored here
     */
    static public String errMsg = "";

    /**
     * Converts an ISO 8601 to Unix timestamp.
     * 
     * @param dateInText
     * @return A valid timestamp if success or null if an error occurs
     */
    static private String toMilliString(String dateInText) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        long value;
        int dateInTextLen = dateInText.length();

        //https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html

        if (dateInTextLen == 0) {
            errMsg = "Date length is zero";
            return null;
        }
        
        try {
            value = df.parse(dateInText.substring(0, dateInTextLen-1).concat("-0700")).toInstant().toEpochMilli();
        } catch (ParseException e) {
            errMsg = e.getMessage();
            return null;
        }
        
        return String.valueOf(value);
    }

    /**
     * Parse CSV line contained specified params and parses to JSON string. 
     *
     * @param  textLine input text line
     * @return      JSON string line if success or null if fails on parse
    */
    static public String toJsonStringLine(String textLine) {
        String textLineSplitted[];
        String metadataSplit[];
        String jsonResult = "{\"timestamp\": ";
        String tempString;
        int i;

        if (textLine.length() == 0) {
            errMsg = "Error. CSV textline is null";
            return null;
        }
        
        textLineSplitted = textLine.split("[\\\"\\(|\\)\\\"|,|;]");
        
        if (textLineSplitted.length != 8) {
            errMsg = "Malformatted CSV";
            return null;
        }
        
        tempString = toMilliString(textLineSplitted[0]);
        
        if (tempString == null)
            return null;
        
        jsonResult = jsonResult.concat(tempString);
        
        if (!isNumericPositiveInteger(textLineSplitted[1])) {
            errMsg = "Index has a non numeric positive integer value";
            return null;
        }

        jsonResult = jsonResult
                .concat(", \"index\": ")
                .concat(Integer.valueOf(textLineSplitted[1]).toString()); // Prune zeroes in left side
        
        if (!isDoubleValue(textLineSplitted[2])) {
            errMsg = "signalwave has a non Double value";
            return null;
        }
        
        jsonResult = jsonResult
                .concat(", \"signalwave\": ")
                .concat(Double.valueOf(textLineSplitted[2]).toString()); // Prune zeroes
        
        jsonResult = jsonResult.concat(", \"metadata\": {");
        
        for (i = 0; i < 3; i++) {
            metadataSplit = extractMetadata(textLineSplitted[5+i]);
        
            if (metadataSplit ==  null)
                return null;
        
            if (i > 0)
                jsonResult = jsonResult.concat(", ");
                     
            if (metadataSplit.length == 2) {
                if (metadataSplit[0].compareTo("") != 0) {
                   jsonResult = jsonResult.concat("\"")
                           .concat(metadataSplit[0])
                           .concat("\": \"");
                   
                   if (metadataSplit[1].compareTo("") != 0) {
                       jsonResult = jsonResult.concat(metadataSplit[1])
                               .concat("\"");
                   } else {
                       errMsg = "In metadataSplit index 1 has a empty string";
                       return null;
                   }
                }
            } else {
                
                if (metadataSplit.length != 5) {
                    errMsg = "Wrong metadata size";
                    return null;
                }
                
                if (metadataSplit[0].compareTo("") == 0) {
                    errMsg = "Can't find metadata attribute";
                    return null;
                }
                
                jsonResult = jsonResult.concat("\"")
                        .concat(metadataSplit[0])
                        .concat("\": [");
                
                if (metadataSplit[1].compareTo("") == 0) {
                    errMsg = "Expected first value key in array";
                    return null;
                }
                
                jsonResult = jsonResult.concat("\"")
                        .concat(metadataSplit[1])
                        .concat("\", ");
                
                if (metadataSplit[2].compareTo("") == 0) {
                    errMsg = "Expected second value key in array";
                    return null;
                }
                
                jsonResult = jsonResult.concat("\"")
                        .concat(metadataSplit[2])
                        .concat("\", ");
             
                if (metadataSplit[4].compareTo("") == 0) {
                    errMsg = "Expected third value key in array";
                    return null;
                }
                
                jsonResult = jsonResult.concat("\"")
                        .concat(metadataSplit[4])
                        .concat("\"]");
            }
        
        }
        
        return jsonResult.concat("}}");
    }
    /** 
     * Checks if a string text contains a valid number greater or equal zero
     * 
     * @param textValue
     * @return true is textValue has a valid positive integer number or false if text does not contain a valid positive number
     */
    static public boolean isNumericPositiveInteger(String textValue) {
        Pattern pattern = Pattern.compile("\\d+");
        if (textValue == null) {
            return false; 
        }
        return pattern.matcher(textValue).matches();
    }

    /** 
     * Check is string text contains a Double value.
     * 
     * @param textValue String value
     * @return true if textValue contains a valid Double value and false otherwise
     */
    static private boolean isDoubleValue(String textValue) {
        Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
        if (textValue == null) {
            return false; 
        }
        return pattern.matcher(textValue).matches();
    }
    
    /**
     * Internal function to extract metadata from parameter attribute.
     * 
     * @param metadataText Text containing metadata
     * @return String array of pre-formatted metadata or null if an error occurs
     */
    static private String[] extractMetadata(String metadataText) {
        String[] metadata;
        
        if (metadataText.length() == 0) {
            errMsg = "metadata text is zero";
            return null;
        }
        
        metadata = metadataText.split("[=|[^a-zA-Z0-9]]");
        
        if (metadata.length < 2) {
            errMsg = "Missing parameter in metadata";
            return null;
        }
        
        return metadata;
    }
}
