import type { Quiz } from '@/types';

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-day-1',
    dayId: 1,
    title: 'MIS & Excel Foundations',
    questions: [
      {
        id: 'q1-1',
        question: 'What does MIS stand for?',
        options: [
          'Management Information System',
          'Marketing Information Service',
          'Monthly Information Summary',
          'Master Information Standard',
        ],
        correctIndex: 0,
        explanation:
          'MIS stands for Management Information System — the process of collecting, processing, and presenting data to support management decisions.',
      },
      {
        id: 'q1-2',
        question: 'What is the correct MIS reporting cycle order?',
        options: [
          'Report → Decision → Raw Data → Cleaning → Analysis',
          'Raw Data → Cleaning → Analysis → Report → Decision',
          'Analysis → Raw Data → Report → Cleaning → Decision',
          'Decision → Report → Analysis → Cleaning → Raw Data',
        ],
        correctIndex: 1,
        explanation:
          'The MIS cycle starts with raw data, which is cleaned, analyzed, turned into a report, and then used for decision-making.',
      },
      {
        id: 'q1-3',
        question: 'Which Excel feature lets you freeze the top row so it stays visible while scrolling?',
        options: ['Freeze Panes', 'Lock Cells', 'Pin Header', 'Sticky Row'],
        correctIndex: 0,
        explanation:
          'Freeze Panes (View > Freeze Panes > Freeze Top Row) keeps the header row visible while you scroll through large datasets.',
      },
      {
        id: 'q1-4',
        question: 'What is the primary purpose of filtering in Excel?',
        options: [
          'To delete unwanted rows permanently',
          'To show only rows that meet specific criteria',
          'To sort data alphabetically',
          'To color-code cells automatically',
        ],
        correctIndex: 1,
        explanation:
          'Filtering temporarily hides rows that do not match your criteria, letting you focus on relevant data without deleting anything.',
      },
      {
        id: 'q1-5',
        question: 'Which Excel feature converts a range into a structured, sortable, filterable object?',
        options: ['Pivot Table', 'Excel Table', 'Named Range', 'Data Validation'],
        correctIndex: 1,
        explanation:
          'An Excel Table (Insert > Table) creates a structured range with built-in sorting, filtering, banded rows, and auto-expansion.',
      },
      {
        id: 'q1-6',
        question: 'Why is data cleaning important in MIS reporting?',
        options: [
          'It makes the file size smaller',
          'It ensures reports are accurate and reliable',
          'It is required by Excel',
          'It changes the font style',
        ],
        correctIndex: 1,
        explanation:
          'Data cleaning removes duplicates, fixes formatting, and handles blanks — ensuring the final MIS report is accurate and trustworthy.',
      },
    ],
  },
  {
    id: 'quiz-day-2',
    dayId: 2,
    title: 'Excel Formulas & Core Functions',
    questions: [
      {
        id: 'q2-1',
        question: 'Which function adds all numeric values in a range?',
        options: ['COUNT', 'SUM', 'AVERAGE', 'TOTAL'],
        correctIndex: 1,
        explanation: 'SUM adds all numeric values in the specified range, e.g., =SUM(A1:A10).',
      },
      {
        id: 'q2-2',
        question: 'What does COUNTA count?',
        options: [
          'Only numbers',
          'Only text',
          'All non-empty cells (numbers, text, etc.)',
          'Only blank cells',
        ],
        correctIndex: 2,
        explanation:
          'COUNTA counts all non-empty cells regardless of content type — numbers, text, dates, or logical values.',
      },
      {
        id: 'q2-3',
        question: 'Which reference type uses a $ sign to prevent the reference from changing when copied?',
        options: ['Relative reference', 'Absolute reference', 'Mixed reference', 'Circular reference'],
        correctIndex: 1,
        explanation:
          'An absolute reference (e.g., $A$1) uses $ signs to lock both the column and row so the reference does not change when the formula is copied.',
      },
      {
        id: 'q2-4',
        question: 'What does =A1*$B$1 produce when copied down from row 1 to row 5?',
        options: [
          'A1*$B$1, A2*$B$1, A3*$B$1, A4*$B$1, A5*$B$1',
          'A1*$B$1, A2*$B$2, A3*$B$3, A4*$B$4, A5*$B$5',
          'A1*B1, A2*B2, A3*B3, A4*B4, A5*B5',
          'A1*$B$1, A1*$B$1, A1*$B$1, A1*$B$1, A1*$B$1',
        ],
        correctIndex: 0,
        explanation:
          'The relative part (A1) changes per row, but the absolute part ($B$1) stays locked on cell B1.',
      },
      {
        id: 'q2-5',
        question: 'How do you calculate achievement % if target is in B1 and actual is in C1?',
        options: [
          '=B1/C1',
          '=C1/B1',
          '=B1*C1',
          '=B1-C1',
        ],
        correctIndex: 1,
        explanation: 'Achievement % = Actual / Target, so =C1/B1 gives the percentage of the target achieved.',
      },
      {
        id: 'q2-6',
        question: 'Which function returns the largest value in a range?',
        options: ['MIN', 'MAX', 'LARGE', 'TOP'],
        correctIndex: 1,
        explanation: 'MAX returns the largest numeric value in the specified range.',
      },
      {
        id: 'q2-7',
        question: 'What is the difference between COUNT and COUNTA?',
        options: [
          'COUNT counts all cells; COUNTA counts only numbers',
          'COUNT counts only numbers; COUNTA counts all non-empty cells',
          'They are identical',
          'COUNT counts text; COUNTA counts numbers',
        ],
        correctIndex: 1,
        explanation:
          'COUNT only counts cells containing numbers. COUNTA counts all non-empty cells including text, dates, and logical values.',
      },
    ],
  },
  {
    id: 'quiz-day-3',
    dayId: 3,
    title: 'Logical Functions & Conditional Analysis',
    questions: [
      {
        id: 'q3-1',
        question: 'What does =IF(A1>=50,"Pass","Fail") return when A1 = 48?',
        options: ['Pass', 'Fail', '48', 'Error'],
        correctIndex: 1,
        explanation:
          'Since 48 is less than 50, the condition is FALSE, so the function returns "Fail".',
      },
      {
        id: 'q3-2',
        question: 'Which function handles errors gracefully by returning a fallback value?',
        options: ['IFERROR', 'IFNA', 'ISERROR', 'IFERR'],
        correctIndex: 0,
        explanation:
          'IFERROR(value, value_if_error) returns the fallback value if the first argument results in an error, e.g., =IFERROR(VLOOKUP(...),"Not Found").',
      },
      {
        id: 'q3-3',
        question: 'What does =AND(A1>0, A1<100) return when A1 = 50?',
        options: ['TRUE', 'FALSE', '50', 'Error'],
        correctIndex: 0,
        explanation:
          'Both conditions are true (50 > 0 AND 50 < 100), so AND returns TRUE.',
      },
      {
        id: 'q3-4',
        question: 'Which function counts cells that meet a single condition?',
        options: ['COUNTIF', 'SUMIF', 'COUNTA', 'IFCOUNT'],
        correctIndex: 0,
        explanation:
          'COUNTIF(range, criteria) counts the number of cells that meet a single condition, e.g., =COUNTIF(A:A,"Pass").',
      },
      {
        id: 'q3-5',
        question: 'What does =SUMIF(A:A,">100",B:B) do?',
        options: [
          'Sums values in column A where values are greater than 100',
          'Sums values in column B where corresponding values in column A are greater than 100',
          'Counts cells in column A greater than 100',
          'Sums all values in both columns',
        ],
        correctIndex: 1,
        explanation:
          'SUMIF checks column A for values > 100, then sums the corresponding values in column B (the sum range).',
      },
      {
        id: 'q3-6',
        question: 'How would you categorize a score as "High", "Medium", or "Low" using nested IF?',
        options: [
          '=IF(A1>=80,"High",IF(A1>=50,"Medium","Low"))',
          '=IF(A1>=50,"Low",IF(A1>=80,"High","Medium"))',
          '=IF(A1>=80,"High","Low","Medium")',
          '=IF(A1, "High", "Medium", "Low")',
        ],
        correctIndex: 0,
        explanation:
          'Nested IF evaluates top-down: if >= 80 return "High", else if >= 50 return "Medium", else return "Low".',
      },
    ],
  },
  {
    id: 'quiz-day-4',
    dayId: 4,
    title: 'Lookup Mastery',
    questions: [
      {
        id: 'q4-1',
        question: 'Which VLOOKUP argument determines whether you want an exact or approximate match?',
        options: [
          'The first argument (lookup_value)',
          'The second argument (table_array)',
          'The fourth argument (range_lookup)',
          'The third argument (col_index_num)',
        ],
        correctIndex: 2,
        explanation:
          'The fourth argument, range_lookup, is FALSE for exact match and TRUE (or omitted) for approximate match.',
      },
      {
        id: 'q4-2',
        question: 'What is a key limitation of VLOOKUP?',
        options: [
          'It can only look up values in the first column of the table',
          'It cannot return text values',
          'It only works with numbers',
          'It requires internet access',
        ],
        correctIndex: 0,
        explanation:
          'VLOOKUP can only search in the leftmost column of the table array and return values to the right. XLOOKUP and INDEX/MATCH overcome this.',
      },
      {
        id: 'q4-3',
        question: 'Which function is a modern replacement for VLOOKUP available in Excel 365?',
        options: ['HLOOKUP', 'XLOOKUP', 'DLOOKUP', 'MATCH'],
        correctIndex: 1,
        explanation:
          'XLOOKUP can look up in any column, return from any column, handle errors natively, and work with arrays — overcoming VLOOKUP limitations.',
      },
      {
        id: 'q4-4',
        question: 'What does =INDEX(B:B, MATCH("John", A:A, 0)) do?',
        options: [
          'Finds "John" in column B and returns the row from column A',
          'Finds "John" in column A and returns the corresponding value from column B',
          'Counts occurrences of "John"',
          'Sorts column A by "John"',
        ],
        correctIndex: 1,
        explanation:
          'MATCH finds the row position of "John" in column A, and INDEX returns the value at that row position in column B.',
      },
      {
        id: 'q4-5',
        question: 'What does MATCH return when used with match_type 0?',
        options: [
          'The relative position of the matched item',
          'The value of the matched item',
          'A boolean TRUE/FALSE',
          'The count of matching items',
        ],
        correctIndex: 0,
        explanation:
          'MATCH with match_type 0 (exact match) returns the relative position (row number) of the lookup value within the lookup array.',
      },
      {
        id: 'q4-6',
        question: 'What happens when VLOOKUP cannot find a match and range_lookup is FALSE?',
        options: ['Returns 0', 'Returns #N/A', 'Returns blank', 'Returns the closest match'],
        correctIndex: 1,
        explanation:
          'When VLOOKUP with exact match (FALSE) cannot find the lookup value, it returns the #N/A error. Wrap with IFERROR to handle gracefully.',
      },
    ],
  },
  {
    id: 'quiz-day-6',
    dayId: 6,
    title: 'MIS Reporting & KPI Management',
    questions: [
      {
        id: 'q6-1',
        question: 'What does SLA stand for in MIS reporting?',
        options: [
          'Service Level Agreement',
          'Standard Level Analysis',
          'System Level Assessment',
          'Service Level Audit',
        ],
        correctIndex: 0,
        explanation:
          'SLA stands for Service Level Agreement — a commitment to meet a defined service standard, often measured as a percentage of cases resolved within target.',
      },
      {
        id: 'q6-2',
        question: 'How is SLA % typically calculated?',
        options: [
          'Tickets resolved within target / Total tickets × 100',
          'Total tickets / Tickets resolved × 100',
          'Tickets assigned / Tickets resolved × 100',
          'Tickets resolved / Total tickets × 100',
        ],
        correctIndex: 0,
        explanation:
          'SLA % = (Tickets resolved within the target time / Total tickets) × 100. This measures how often the team meets the agreed response/resolution time.',
      },
      {
        id: 'q6-3',
        question: 'What does TAT measure?',
        options: [
          'Total Average Time',
          'Turn Around Time — the time taken to complete a task',
          'Target Achievement Time',
          'Team Activity Total',
        ],
        correctIndex: 1,
        explanation:
          'TAT (Turn Around Time) measures the average time taken to complete a task or resolve a ticket from start to finish.',
      },
      {
        id: 'q6-4',
        question: 'What is variance in MIS reporting?',
        options: [
          'The difference between target and actual values',
          'The sum of all values',
          'The average of all values',
          'The maximum value in a range',
        ],
        correctIndex: 0,
        explanation:
          'Variance = Actual − Target (or Target − Actual). It shows whether performance is above or below the planned level.',
      },
      {
        id: 'q6-5',
        question: 'Which is NOT a typical MIS report frequency?',
        options: ['Daily', 'Weekly', 'Monthly', 'Hourly'],
        correctIndex: 3,
        explanation:
          'MIS reports are typically daily, weekly, or monthly. Hourly reports are operational dashboards, not standard MIS reports.',
      },
      {
        id: 'q6-6',
        question: 'What is productivity in an MIS context?',
        options: [
          'Output per employee per unit of time',
          'Total revenue of the company',
          'Number of meetings attended',
          'The quality score of deliverables',
        ],
        correctIndex: 0,
        explanation:
          'Productivity = Output / Time (e.g., tickets resolved per agent per hour). It measures how efficiently work is being done.',
      },
      {
        id: 'q6-7',
        question: 'What does AHT stand for in customer support MIS?',
        options: [
          'Average Handling Time',
          'Actual Hourly Total',
          'Agent Help Time',
          'Average Hold Time',
        ],
        correctIndex: 0,
        explanation:
          'AHT (Average Handling Time) is the average duration an agent spends on a single interaction, including talk, hold, and after-call work.',
      },
    ],
  },
  {
    id: 'quiz-day-7',
    dayId: 7,
    title: 'Pivot Tables & MIS Analysis',
    questions: [
      {
        id: 'q7-1',
        question: 'What is a Pivot Table used for?',
        options: [
          'Summarizing and analyzing large datasets by grouping and aggregating',
          'Creating charts from scratch',
          'Formatting cells with colors',
          'Protecting a worksheet with a password',
        ],
        correctIndex: 0,
        explanation:
          'Pivot Tables let you summarize, group, and aggregate large datasets without writing formulas — drag fields into rows, columns, and values.',
      },
      {
        id: 'q7-2',
        question: 'Where do you place a field to see a count of records by category?',
        options: ['Rows area', 'Columns area', 'Values area', 'Filters area'],
        correctIndex: 2,
        explanation:
          'Dragging a field into the Values area with "Count" aggregation shows how many records exist per category.',
      },
      {
        id: 'q7-3',
        question: 'What does a Slicer do?',
        options: [
          'Cuts the Pivot Table in half',
          'Provides an interactive filter button for Pivot Table data',
          'Removes blank rows',
          'Exports data to CSV',
        ],
        correctIndex: 1,
        explanation:
          'A Slicer is an interactive visual filter that lets users click to filter Pivot Table data by one or more values in a field.',
      },
      {
        id: 'q7-4',
        question: 'How do you group dates by month in a Pivot Table?',
        options: [
          'Right-click a date in the Pivot > Group > select Months',
          'Use the =MONTH() formula in the source data',
          'You cannot group dates in a Pivot Table',
          'Sort the dates alphabetically',
        ],
        correctIndex: 0,
        explanation:
          'Right-click any date value in the Pivot Table, select Group, and choose Months (or Days/Quarters/Years) to group dates by time period.',
      },
      {
        id: 'q7-5',
        question: 'What is a Pivot Chart?',
        options: [
          'A chart created from a Pivot Table that updates dynamically with the Pivot',
          'A static chart that cannot be changed',
          'A chart style in Excel',
          'A chart that only works with pie data',
        ],
        correctIndex: 0,
        explanation:
          'A Pivot Chart is linked to a Pivot Table and automatically updates when the Pivot Table is filtered or restructured.',
      },
      {
        id: 'q7-6',
        question: 'What happens when you refresh a Pivot Table after updating source data?',
        options: [
          'The Pivot Table updates to reflect the new source data',
          'The Pivot Table is deleted',
          'The source data is formatted',
          'Nothing changes',
        ],
        correctIndex: 0,
        explanation:
          'Refreshing (PivotTable Analyze > Refresh) pulls the latest source data so the Pivot Table reflects any additions or changes.',
      },
    ],
  },
  {
    id: 'quiz-day-8',
    dayId: 8,
    title: 'Advanced Excel for MIS',
    questions: [
      {
        id: 'q8-1',
        question: 'What does SUMIFS do that SUMIF cannot?',
        options: [
          'Sum based on multiple conditions across different ranges',
          'Sum based on a single condition',
          'Sum only text values',
          'Sum entire columns',
        ],
        correctIndex: 0,
        explanation:
          'SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...) allows multiple conditions across different ranges.',
      },
      {
        id: 'q8-2',
        question: 'Which formula sums sales in column C where column A = "North" and column B > 100?',
        options: [
          '=SUMIFS(C:C, A:A, "North", B:B, ">100")',
          '=SUMIF(A:A, "North", C:C) + SUMIF(B:B, ">100", C:C)',
          '=SUMIFS(A:A, "North", B:B, ">100", C:C)',
          '=SUM(C:C, A:A="North", B:B>100)',
        ],
        correctIndex: 0,
        explanation:
          'SUMIFS takes the sum range first, then pairs of criteria ranges and criteria: =SUMIFS(C:C, A:A, "North", B:B, ">100").',
      },
      {
        id: 'q8-3',
        question: 'What does COUNTIFS do?',
        options: [
          'Counts cells meeting multiple conditions',
          'Counts all non-empty cells',
          'Counts only numbers',
          'Counts unique values',
        ],
        correctIndex: 0,
        explanation:
          'COUNTIFS counts the number of cells that meet all specified conditions across multiple ranges.',
      },
      {
        id: 'q8-4',
        question: 'What is conditional formatting used for?',
        options: [
          'Automatically formatting cells based on their values or rules',
          'Manually coloring cells',
          'Protecting cells from editing',
          'Sorting data alphabetically',
        ],
        correctIndex: 0,
        explanation:
          'Conditional formatting applies visual styles (colors, icons, data bars) to cells that meet user-defined rules — useful for highlighting SLA breaches or exceptions.',
      },
      {
        id: 'q8-5',
        question: 'What is exception reporting?',
        options: [
          'Highlighting only data that deviates from expected norms or thresholds',
          'Reporting all data without filtering',
          'Creating a chart for every data point',
          'Deleting unusual records',
        ],
        correctIndex: 0,
        explanation:
          'Exception reporting focuses management attention on data that falls outside acceptable thresholds — e.g., SLA below 90% or quality below 95%.',
      },
      {
        id: 'q8-6',
        question: 'Which XLOOKUP feature is NOT available in VLOOKUP?',
        options: [
          'Searching from right to left (lookup column does not need to be first)',
          'Returning a value from the same column',
          'Using exact match',
          'Returning a single value',
        ],
        correctIndex: 0,
        explanation:
          'XLOOKUP can look up in any column and return from any column — including columns to the left of the lookup column. VLOOKUP cannot.',
      },
    ],
  },
  {
    id: 'quiz-day-10',
    dayId: 10,
    title: 'Power BI Fundamentals',
    questions: [
      {
        id: 'q10-1',
        question: 'What is Power BI primarily used for?',
        options: [
          'Interactive data visualization and business intelligence reporting',
          'Word processing',
          'Accounting and invoicing',
          'Email management',
        ],
        correctIndex: 0,
        explanation:
          'Power BI is a business analytics tool for creating interactive dashboards, reports, and data visualizations from multiple data sources.',
      },
      {
        id: 'q10-2',
        question: 'What is Power Query in Power BI?',
        options: [
          'A data transformation and cleaning tool built into Power BI',
          'A chart type',
          'A DAX function',
          'A publishing tool',
        ],
        correctIndex: 0,
        explanation:
          'Power Query is the data preparation engine in Power BI — it lets you import, clean, transform, and shape data before loading it into the model.',
      },
      {
        id: 'q10-3',
        question: 'What is a measure in Power BI?',
        options: [
          'A DAX calculation that evaluates dynamically based on filter context',
          'A unit of data size',
          'A visual type',
          'A data source connection',
        ],
        correctIndex: 0,
        explanation:
          'A measure is a DAX formula (e.g., Total Sales = SUM(Sales[Amount])) that calculates dynamically based on the filters and slicers applied in the report.',
      },
      {
        id: 'q10-4',
        question: 'What is the purpose of relationships in Power BI?',
        options: [
          'To connect multiple tables so they can be used together in visuals',
          'To create charts',
          'To format colors',
          'To export data',
        ],
        correctIndex: 0,
        explanation:
          'Relationships link tables via common columns (e.g., EmployeeID), allowing visuals to pull data from multiple tables simultaneously.',
      },
      {
        id: 'q10-5',
        question: 'What does DAX stand for?',
        options: [
          'Data Analysis Expressions',
          'Data Access Extension',
          'Dynamic Analysis XML',
          'Data Aggregation eXtension',
        ],
        correctIndex: 0,
        explanation:
          'DAX (Data Analysis Expressions) is the formula language used in Power BI for creating measures, calculated columns, and custom calculations.',
      },
      {
        id: 'q10-6',
        question: 'What is a slicer in Power BI?',
        options: [
          'An interactive visual that filters other visuals on the report page',
          'A chart type',
          'A data source',
          'A DAX function',
        ],
        correctIndex: 0,
        explanation:
          'A slicer is an on-canvas filter control that lets users click values to filter all related visuals on the page.',
      },
      {
        id: 'q10-7',
        question: 'Which file type is a Power BI report saved as?',
        options: ['.pbix', '.xlsx', '.pbit', '.csv'],
        correctIndex: 0,
        explanation: 'Power BI Desktop reports are saved as .pbix files, which contain the report, data model, and queries.',
      },
    ],
  },
  {
    id: 'quiz-day-11',
    dayId: 11,
    title: 'SQL Fundamentals',
    questions: [
      {
        id: 'q11-1',
        question: 'Which SQL clause filters rows based on a condition?',
        options: ['WHERE', 'FILTER', 'IF', 'SELECT'],
        correctIndex: 0,
        explanation:
          'WHERE filters rows before grouping, e.g., SELECT * FROM employees WHERE department = "Sales".',
      },
      {
        id: 'q11-2',
        question: 'What does GROUP BY do?',
        options: [
          'Groups rows with the same values for aggregation',
          'Sorts rows alphabetically',
          'Deletes duplicate tables',
          'Limits the number of rows returned',
        ],
        correctIndex: 0,
        explanation:
          'GROUP BY groups rows that share the same values in specified columns, enabling aggregate functions like COUNT, SUM, and AVG per group.',
      },
      {
        id: 'q11-3',
        question: 'Which clause filters groups after GROUP BY?',
        options: ['HAVING', 'WHERE', 'FILTER', 'ORDER BY'],
        correctIndex: 0,
        explanation:
          'HAVING filters groups after aggregation, e.g., GROUP BY department HAVING COUNT(*) > 10. WHERE filters individual rows before grouping.',
      },
      {
        id: 'q11-4',
        question: 'What does ORDER BY do?',
        options: [
          'Sorts the result set by one or more columns',
          'Groups rows',
          'Filters rows',
          'Joins tables',
        ],
        correctIndex: 0,
        explanation:
          'ORDER BY sorts the result set ascending (default) or descending (DESC), e.g., ORDER BY salary DESC.',
      },
      {
        id: 'q11-5',
        question: 'What does SELECT COUNT(*) FROM employees return?',
        options: [
          'The total number of rows in the employees table',
          'The number of unique departments',
          'The sum of all salaries',
          'The first row in the table',
        ],
        correctIndex: 0,
        explanation: 'COUNT(*) counts all rows in the table, including rows with NULL values.',
      },
      {
        id: 'q11-6',
        question: 'What does AVG(salary) calculate?',
        options: [
          'The average salary across all rows',
          'The maximum salary',
          'The total salary sum',
          'The number of employees',
        ],
        correctIndex: 0,
        explanation: 'AVG(salary) returns the arithmetic mean of all non-NULL salary values.',
      },
      {
        id: 'q11-7',
        question: 'What is a JOIN used for?',
        options: [
          'Combining rows from two or more tables based on a related column',
          'Deleting rows from a table',
          'Creating a new table',
          'Sorting results',
        ],
        correctIndex: 0,
        explanation:
          'A JOIN combines columns from two or more tables based on a shared column (usually a primary/foreign key relationship).',
      },
    ],
  },
  {
    id: 'quiz-day-13',
    dayId: 13,
    title: 'MIS Interview Preparation',
    questions: [
      {
        id: 'q13-1',
        question: 'How should you structure your "Tell me about yourself" answer?',
        options: [
          'Present, Past, Future — current role, relevant background, career goals',
          'List every job you have ever had chronologically',
          'Talk about your hobbies and personal life',
          'Read your resume word for word',
        ],
        correctIndex: 0,
        explanation:
          'The Present-Past-Future framework keeps your answer concise and relevant: what you do now, what experience got you here, and where you want to go.',
      },
      {
        id: 'q13-2',
        question: 'What is the best way to answer "Why should we hire you?"?',
        options: [
          'Connect your specific skills and experience to the job requirements',
          'Say you need the job desperately',
          'List generic strengths without context',
          'Compare yourself to other candidates',
        ],
        correctIndex: 0,
        explanation:
          'Map your skills (Excel, MIS reporting, SQL) directly to what the role needs, with a concrete example for each.',
      },
      {
        id: 'q13-3',
        question: 'When asked "What is MIS?", what is the best answer?',
        options: [
          'A system that collects, processes, and presents data to support management decisions',
          'A type of Excel formula',
          'A software for email management',
          'A database backup tool',
        ],
        correctIndex: 0,
        explanation:
          'MIS is a system/process that transforms raw data into meaningful information to help managers make informed decisions.',
      },
      {
        id: 'q13-4',
        question: 'How should you answer "How would you investigate an SLA drop?"',
        options: [
          'Outline a structured approach: identify the drop, segment by team/time, check root causes, report findings',
          'Say you would ignore it',
          'Blame the team immediately',
          'Say it is not your responsibility',
        ],
        correctIndex: 0,
        explanation:
          'Show structured thinking: confirm the drop, break it down by team/time/ticket type, investigate root causes, and present findings with recommendations.',
      },
      {
        id: 'q13-5',
        question: 'What is a strong answer to "How do you validate a report?"',
        options: [
          'Cross-check totals, verify formulas, compare with source data, and have a peer review',
          'Trust the numbers and send it',
          'Only check the formatting',
          'Skip validation if it looks right',
        ],
        correctIndex: 0,
        explanation:
          'Validation includes: cross-footing totals, verifying formula ranges, reconciling with source data, and peer review before publishing.',
      },
      {
        id: 'q13-6',
        question: 'When asked "VLOOKUP vs XLOOKUP?", what key point should you mention?',
        options: [
          'XLOOKUP can search in any column and handle errors natively, while VLOOKUP is limited to the first column',
          'VLOOKUP is always better than XLOOKUP',
          'They are identical functions',
          'XLOOKUP only works in Google Sheets',
        ],
        correctIndex: 0,
        explanation:
          'XLOOKUP overcomes VLOOKUP limitations: it can look left, has built-in error handling, and defaults to exact match. VLOOKUP is still widely used in older files.',
      },
    ],
  },
];
