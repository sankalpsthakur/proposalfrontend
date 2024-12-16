function main(workbook: ExcelScript.Workbook) {
    // Get the active worksheet
    let sheet = workbook.getActiveWorksheet();

    // Determine the number of rows and columns explicitly
    let lastRow = sheet.getRange("A:A").getUsedRange().getRowCount(); // Count rows in column A
    let lastColumn = sheet.getUsedRange().getColumnCount(); // Count total columns

    // Add "Leave policy" header in row 6 if it doesn't already exist
    let leavePolicyHeader = sheet.getCell(5, lastColumn);
    if (leavePolicyHeader.getValue() !== "Leave policy") {
        leavePolicyHeader.setValue("Leave policy");
    }

    // Get the range of employee IDs starting from row 7
    let employeeIDs = sheet.getRangeByIndexes(6, 0, lastRow - 6, 1); // Start at row 7 (index 6), column A
    let leavePolicyColumn = sheet.getRangeByIndexes(6, lastColumn, lastRow - 6, 1); // Corresponding column for Leave policy

    // List of IDs that should be assigned Leave Policy 1
    const option1IDs = [
        "HYG0019", "HYG0042", "HYG0097", "HYG0129", "HYG0131", "HYG0144",
        "HYG0015", "HYG0043", "HYG0059", "HYG0084", "HYG0098", "HYG0117",
        "HYG007", "HYG008", "HYG0014", "HYG0018", "HYG0090", "HYG0105",
        "HYG0113", "HYG004", "HYG0028", "HYG0062", "HYG0065", "HYG0078",
        "HYG0082", "HYG0089", "HYG0091", "HYG0093", "HYG0095", "HYG0094",
        "HYG0100", "HYG0104", "HYG0112", "HYG0115", "HYG0120", "HYG0122",
        "HYG-Temp-006", "HYG0126", "HYG0145", "HYG0146", "HYG0149", "HYG0150"
    ];

    // Loop through each employee ID and assign Leave Policy
    let ids = employeeIDs.getValues();
    let policies: number[][] = []; // Explicitly declare as a 2D array of numbers

    for (let i = 0; i < ids.length; i++) {
        let employeeID = ids[i][0] as string;
        if (option1IDs.includes(employeeID)) {
            policies.push([1]); // Assign Leave policy 1
        } else {
            policies.push([2]); // Assign Leave policy 2
        }
    }

    // Set the Leave policy values
    leavePolicyColumn.setValues(policies);

    // Iterate through rows to update cells based on "Leave policy" and "W"
    let dataRange = sheet.getRangeByIndexes(6, 0, lastRow - 6, lastColumn);
    let data = dataRange.getValues();

    for (let i = 0; i < data.length; i++) {
        if (policies[i][0] === 1) { // Process rows where Leave policy is 1
            for (let j = 2; j < data[i].length; j++) { // Start from column 2 (index 2)
                if (data[i][j] === "W" && data[i][j - 1] !== "H") {
                    data[i][j - 1] = "WS"; // Populate the cell before "W" with "WS"
                    if(data[i][j+6] !== null || data[i][j+6] !== ""){
                    data[i][j+6] = "WS";
                }
                }
            }
        } else if (policies[i][0] === 2) { // Process rows where Leave policy is 2
            for (let j = 2; j < data[i].length; j++) { // Start from column 2 (index 2)
                if (data[i][j] === "W" && data[i][j - 1] !== "H") {
                    data[i][j - 1] = "WFHS"; // Replace the cell before "W" with "WFHS"
                    if(data[i][j+6] !== null || data[i][j+6] !== ""){
                    data[i][j+6] = "WFHS";
                }
                }
            }
        }
    }

    // Set the updated data back to the sheet
    dataRange.setValues(data);
}
