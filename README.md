# Camping Meal Planner

A Google Apps Script project that helps you plan and organize meals for camping trips. This tool automates the creation of meal plans and generates detailed reports with ingredient quantities for your camping adventures.

## Quick Start

### 1. Copy the Template
1. Click this link to access the template: [Camping Food Planning Template](https://docs.google.com/spreadsheets/d/13P6zvZsphdTY5kmdCqKZwY9GvoIpHT_9aphpIQKkF9w/edit?usp=sharing)
2. Click **File → Make a copy** to create your own copy in your Google Drive
3. The template comes with all the code pre-loaded and ready to use!

### 2. Set Up Your Trip
1. Enter your **Park Name** (e.g., "Turkey Point")
2. Set your **Start Date** and **End Date**
3. Click the **Plan** button to initialize your meal planning sheets
4. Update the number of people on the Plan sheet
5. Choose meals for each day from the dropdown menus

### 3. Customize Your Items
1. Go to the **Items** sheet to add/modify individual food items and their default storage locations
2. Go to the **Components** sheet to adjust meal component details and quantities per person
3. Copy default values and override locations as needed (use Ctrl+Shift+V to paste values only)

### 4. Generate Your Report
1. Click the **Report** button to build your detailed camping meal report
2. Print the Report sheet to take with you on your trip
3. Use the Packing List as your checklist and purchase list

## Features

- **Pre-configured Template**: Everything is set up and ready to use immediately
- **Automated Meal Planning**: Generate meal plans for any date range
- **Meal Categories**: Supports Breakfast, Lunch, Supper, and Snacks
- **Ingredient Management**: Track components and quantities for each meal
- **Report Generation**: Create detailed daily reports with ingredient lists
- **Packing List**: Built-in checklist for your camping gear and food items
- **Google Sheets Integration**: Works seamlessly with Google Sheets

## Project Structure

```
Camping/
├── appsscript.json    # Google Apps Script configuration
├── Code.js           # Main application logic
└── README.md         # This file
```

## Template Sheets

The template includes the following pre-configured sheets:
- **Start** - Main setup and instructions
- **Plan** - Meal planning interface
- **Inventory** - Food inventory management
- **Report** - Generated meal reports
- **Packing List** - Camping checklist
- **Items** - Individual food items database
- **Components** - Meal component details
- **Builder** - Meal building tools
- **Meals** - Meal definitions
- **Admin** - Administrative settings

## Usage Instructions

### Initial Setup
1. **Copy the template** using the link above
2. **Enter trip details**: Park name, start date, end date
3. **Click Plan button** to initialize all sheets
4. **Update people count** on the Plan sheet
5. **Select meals** for each day from the dropdowns

### Customization
- **Modify Items**: Add your own food items and storage locations
- **Adjust Components**: Change meal quantities and ingredients
- **Update Meals**: Create new meal combinations
- **Set Locations**: Define where items are stored (cooler, dry storage, etc.)

### Report Generation
1. Ensure all meals are selected on the Plan sheet
2. Click the **Report** button
3. Review the generated report for accuracy
4. Print the Report sheet for your trip

## Functions

### `initializePlan()`
Creates the meal planning structure for your camping trip:
- Generates rows for each day between start and end dates
- Sets up meal categories (Breakfast, Lunch, Supper, Snacks)
- Applies data validation for meal selection
- Handles partial days (3 meals for first day, 4 for full days, 2 for last day)

### `generateReport()`
Creates a detailed report with:
- Daily breakdown of meals
- Ingredient lists with quantities
- Organized by meal type (Breakfast, Lunch, Supper, Snacks)
- Calculated quantities based on meal selections

### `clearSheet(sheetName, startRange)`
Utility function to clear content from specified sheets and ranges.

## Tips for Use

1. **Start with the Template**: Use the provided template for immediate functionality
2. **Customize Gradually**: Modify items and components to match your preferences
3. **Review Reports**: Always check the generated report before your trip
4. **Save Copies**: Use "Make a Copy" to preserve specific trip plans
5. **Print Reports**: Take the printed report with you for easy reference

## Troubleshooting

- **Script Not Running**: Ensure you've copied the template to your own Google Drive
- **Missing Data**: Check that your Items and Components sheets have the necessary data
- **Date Issues**: Verify that start and end dates are in the correct format
- **Permission Errors**: Make sure you're working in your own copy of the spreadsheet

## Contributing

This is a personal camping meal planning tool. Feel free to modify and adapt it for your own camping adventures!

## License

This project is for personal use. Modify as needed for your camping needs. 