package desafiointelie;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * This class contains methods to open file, append text line, create file utilities.
 */
public class OpenFile {

    private final String fileName;
    private String errorMsg;
    private File fileObj;
    private FileWriter fileWriterObj;
    private long lineCount;
    
    /**
     * Class OpenFile creates a new instance to open/create/close file.
     * 
     * @param fileName path and file name for store incoming JSON string
     */
    OpenFile(String fileName) {
        this.fileName = fileName;
        this.lineCount = 0;
    }
    
    /**
     * Open/Creates a file.
     * 
     * Creates a new file and open it to record JSON string lines
     * @return true if files is created and opened or false if an error occurs
     */
    public boolean openFile() {
        try {
            System.out.println("Creating file ...");
            this.fileObj = new File(this.fileName);
            if (!fileObj.createNewFile()) {
                this.errorMsg = "File ".concat(this.fileName).concat(" already exists");
                return false;
            }
            
            fileWriterObj = new FileWriter(fileObj, true);
            System.out.println("File ".concat(this.fileName).concat(" created successfully"));
            System.out.println("Begin recording data");
            
        } catch (IOException e) {
            this.errorMsg = e.getMessage();
            return false;
        }
        
        return true;
    }
    
    /**
     * Closes an opened file.
     * 
     * @return true if file is closed successfully or false on error
     */
    public boolean closeFile() {
        System.out.println("Closing file ".concat(this.fileName));
        try {
            this.fileWriterObj.close();
        } catch (IOException e) {
            this.errorMsg = e.getMessage();
            return false;
        }
        System.out.println("File closed and saved");
        return true;
    }
    
    /**
     * Appends a new line into a opened text file.
     * <p>
     * @param line Line to be append to open file
     * @return true if text line is appended to file or false on error
     */
    public boolean appendLine(String line) {
        try {
            this.fileWriterObj.append(line);
            this.lineCount++;
        } catch (IOException e) {
            this.errorMsg = e.getMessage();
            return false;
        }
        return true;
    }
    /**
     * Gets last error in OpenFile instance.
     * <p>
     * @return String containing last error description in OpenFile inanstance
     */
    public String getError() {
        return this.errorMsg;
    }
    
    /**
     * Gets the number of recorded lines in opened file.
     * @return Number of lines recorded in file
     */
    public long getLines() {
        return this.lineCount;
    }
}
