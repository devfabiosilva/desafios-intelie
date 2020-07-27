package desafiointelie;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class OpenFile {

    private final String fileName;
    private String errorMsg;
    private File fileObj;
    private FileWriter fileWriterObj;
    private long lineCount;
    
    OpenFile(String fileName) {
        this.fileName = fileName;
        this.lineCount = 0;
    }
    
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
    
    public String getError() {
        return this.errorMsg;
    }
    
    public long getLines() {
        return this.lineCount;
    }
}
