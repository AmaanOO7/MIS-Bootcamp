import type { InterviewQuestion } from '@/types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // HR Questions
  {
    id: 'hr-1',
    category: 'HR',
    question: 'Tell me about yourself.',
    modelAnswer:
      'Use the Present-Past-Future framework. Start with your current role and what you do, then briefly cover relevant background experience, and finish with where you want to go. Keep it to 60-90 seconds. Example: "I am currently working as a data coordinator where I manage daily reporting using Excel. Over the past two years I have built strong skills in data cleaning, Pivot Tables, and MIS reporting. I am now looking to transition into a dedicated MIS Analyst role where I can use these skills to support data-driven decision-making."',
  },
  {
    id: 'hr-2',
    category: 'HR',
    question: 'Walk me through your experience.',
    modelAnswer:
      'Give a concise chronological summary focusing on roles most relevant to MIS. Highlight specific tools (Excel, SQL, Power BI), types of reports you built, and the impact. Example: "I started in operations where I learned how business processes work. I then moved into a data coordinator role where I built daily MIS reports in Excel, automated reporting with Pivot Tables and formulas, and recently started learning Power BI and SQL to expand my reporting capabilities."',
  },
  {
    id: 'hr-3',
    category: 'HR',
    question: 'Why MIS?',
    modelAnswer:
      'Show genuine interest in the intersection of data and decision-making. Example: "I enjoy working with data and turning raw numbers into insights that help managers make better decisions. MIS is the perfect field for that — it combines Excel, reporting, and business analysis. I find it rewarding when a report I build directly helps the team improve performance."',
  },
  {
    id: 'hr-4',
    category: 'HR',
    question: 'Why are you changing roles?',
    modelAnswer:
      'Frame the change as growth-oriented, not escape-oriented. Example: "In my current role I have built a strong foundation in data and reporting, but I want to move into a dedicated MIS Analyst role where I can focus full-time on building reports, analyzing data, and working with tools like Power BI and SQL. I am looking for a role that challenges me to grow technically while contributing to business decisions."',
  },
  {
    id: 'hr-5',
    category: 'HR',
    question: 'Why should we hire you?',
    modelAnswer:
      'Map your skills directly to the job requirements with a concrete example for each. Example: "I have hands-on experience building daily and weekly MIS reports in Excel, including KPIs like SLA, productivity, and variance. I can clean messy data, build Pivot Tables, and create dashboards. I am also learning Power BI and SQL to expand my toolkit. I am detail-oriented, I validate my reports before sending them, and I communicate findings clearly to non-technical stakeholders."',
  },
  {
    id: 'hr-6',
    category: 'HR',
    question: 'What are your strengths?',
    modelAnswer:
      'Pick 2-3 strengths relevant to MIS with examples. Example: "My first strength is attention to detail — I always cross-check my reports before sending them. Second, I am a quick learner — I taught myself Power BI and SQL alongside my regular work. Third, I communicate well with non-technical stakeholders, which helps me understand what data they actually need."',
  },
  {
    id: 'hr-7',
    category: 'HR',
    question: 'What is your weakness?',
    modelAnswer:
      'Choose a real but non-critical weakness and show how you are addressing it. Example: "I sometimes spend too much time perfecting a report when a first draft would be sufficient. I have started setting time limits for myself and sending drafts to my manager early for feedback, which has helped me balance quality with speed."',
  },
  {
    id: 'hr-8',
    category: 'HR',
    question: 'Where do you see yourself in 3 years?',
    modelAnswer:
      'Show growth aligned with the role. Example: "In three years I see myself as a senior MIS Analyst or a BI developer, having mastered Power BI, SQL, and advanced DAX. I want to be someone who not only builds reports but also helps the team make data-driven decisions. I am also interested in mentoring junior analysts as I grow."',
  },

  // Excel Questions
  {
    id: 'ex-1',
    category: 'Excel',
    question: 'What is VLOOKUP?',
    modelAnswer:
      'VLOOKUP (Vertical Lookup) searches for a value in the leftmost column of a table and returns a value from a specified column in the same row. Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). Use FALSE for exact match. Example: =VLOOKUP(A2, EmployeeData, 3, FALSE) looks up the value in A2 and returns the value from the 3rd column of the EmployeeData table.',
  },
  {
    id: 'ex-2',
    category: 'Excel',
    question: 'VLOOKUP vs XLOOKUP?',
    modelAnswer:
      'VLOOKUP can only search in the leftmost column and return values to the right. XLOOKUP can search in any column and return from any column — including columns to the left. XLOOKUP also has built-in error handling (if_not_found), defaults to exact match, and can return arrays. XLOOKUP is available in Excel 365 and later. VLOOKUP is still widely used in older files and is compatible with all versions.',
  },
  {
    id: 'ex-3',
    category: 'Excel',
    question: 'What is a Pivot Table?',
    modelAnswer:
      'A Pivot Table is a tool that summarizes and analyzes large datasets by grouping and aggregating data. You drag fields into Rows, Columns, Values, and Filters areas to create custom summaries without writing formulas. For example, you can show total sales by team, count of tickets by priority, or average resolution time by agent. Pivot Tables update dynamically when source data changes (after refresh).',
  },
  {
    id: 'ex-4',
    category: 'Excel',
    question: 'What is SUMIFS?',
    modelAnswer:
      'SUMIFS sums values that meet multiple conditions across multiple ranges. Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...). Example: =SUMIFS(Sales, Region, "North", Month, "Jan") sums all sales where Region is North AND Month is Jan. SUMIF only supports a single condition.',
  },
  {
    id: 'ex-5',
    category: 'Excel',
    question: 'What is COUNTIFS?',
    modelAnswer:
      'COUNTIFS counts the number of cells that meet multiple conditions across multiple ranges. Syntax: =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...). Example: =COUNTIFS(Team, "Support", Status, "Resolved") counts all resolved tickets from the Support team. COUNTIF only supports a single condition.',
  },
  {
    id: 'ex-6',
    category: 'Excel',
    question: 'What is IFERROR?',
    modelAnswer:
      'IFERROR returns a custom value if a formula results in an error, otherwise returns the formula result. Syntax: =IFERROR(value, value_if_error). Example: =IFERROR(VLOOKUP(A2, Data, 2, FALSE), "Not Found") returns "Not Found" instead of #N/A when VLOOKUP cannot find a match. It is useful for clean, error-free reports.',
  },
  {
    id: 'ex-7',
    category: 'Excel',
    question: 'INDEX/MATCH vs XLOOKUP?',
    modelAnswer:
      'INDEX/MATCH is a two-function combination: MATCH finds the row position of a lookup value, and INDEX returns the value at that position. It can look left and right, unlike VLOOKUP. XLOOKUP does the same thing in a single function with simpler syntax, built-in error handling, and default exact match. XLOOKUP is preferred in Excel 365+. INDEX/MATCH is still useful in older Excel versions and is slightly faster on very large datasets.',
  },
  {
    id: 'ex-8',
    category: 'Excel',
    question: 'How do you clean data?',
    modelAnswer:
      'My data cleaning process: 1) Remove duplicates using Data > Remove Duplicates. 2) Trim extra spaces with TRIM and clean non-printable characters with CLEAN. 3) Standardize text (e.g., consistent department names) using UPPER/LOWER/PROPER or SUBSTITUTE. 4) Fix date formats using Text to Columns or DATEVALUE. 5) Handle blanks — either fill with defaults or flag for review. 6) Validate with Data Validation rules. 7) Cross-check totals against source data.',
  },
  {
    id: 'ex-9',
    category: 'Excel',
    question: 'How do you identify duplicates?',
    modelAnswer:
      'Three methods: 1) Select the range and use Data > Remove Duplicates to delete them. 2) Use Conditional Formatting > Highlight Cells Rules > Duplicate Values to visually identify them before deleting. 3) Use =COUNTIF(range, cell) > 1 to flag rows with duplicates. For MIS work, I usually highlight first to review before deleting, to avoid losing legitimate records.',
  },
  {
    id: 'ex-10',
    category: 'Excel',
    question: 'How do you create an Excel dashboard?',
    modelAnswer:
      'My process: 1) Plan — identify the audience, key KPIs, and layout. 2) Prepare clean data in a structured table. 3) Build a summary section with KPI cards using formulas. 4) Create charts (bar, line, pie) from the data or Pivot Tables. 5) Add interactive elements — slicers, dropdowns, or form controls. 6) Apply conditional formatting to highlight exceptions. 7) Add a management summary text box. 8) Format consistently — colors, fonts, alignment. 9) Test with different filter combinations.',
  },

  // MIS Questions
  {
    id: 'mis-1',
    category: 'MIS',
    question: 'What is MIS?',
    modelAnswer:
      'MIS (Management Information System) is the process of collecting, processing, analyzing, and presenting data to help managers make informed business decisions. In practice, it involves taking raw operational data, cleaning it, calculating KPIs, and creating structured reports (daily, weekly, monthly) that highlight performance, trends, and exceptions.',
  },
  {
    id: 'mis-2',
    category: 'MIS',
    question: 'What is a KPI?',
    modelAnswer:
      'A KPI (Key Performance Indicator) is a measurable value that shows how effectively a team or process is performing against its goals. Common MIS KPIs include SLA %, productivity, quality score, AHT, attendance %, and achievement %. KPIs should be specific, measurable, and tied to a target so management can quickly see if performance is on track.',
  },
  {
    id: 'mis-3',
    category: 'MIS',
    question: 'What is SLA?',
    modelAnswer:
      'SLA (Service Level Agreement) is a commitment to meet a defined service standard, such as resolving 90% of tickets within 4 hours. SLA % = (Tickets resolved within target / Total tickets) x 100. It is one of the most important KPIs in support operations because it directly measures whether the team is meeting its service promise to customers.',
  },
  {
    id: 'mis-4',
    category: 'MIS',
    question: 'What is TAT?',
    modelAnswer:
      'TAT (Turn Around Time) is the average time taken to complete a task or resolve a ticket from start to finish. It measures process efficiency. A lower TAT means faster resolution. TAT is typically tracked as an average across all tickets for a given day, team, or agent.',
  },
  {
    id: 'mis-5',
    category: 'MIS',
    question: 'What is AHT?',
    modelAnswer:
      'AHT (Average Handling Time) is the average duration an agent spends handling a single interaction, including talk time, hold time, and after-call work. AHT = (Talk Time + Hold Time + After-Call Work) / Total Calls. It is a key efficiency metric in call center and support operations.',
  },
  {
    id: 'mis-6',
    category: 'MIS',
    question: 'What is productivity?',
    modelAnswer:
      'Productivity measures output per unit of input, typically output per employee per hour. In MIS, productivity = Tasks Completed / Time Worked, or Tasks Completed / Target Tasks x 100. It shows how efficiently work is being done and is a core KPI in daily and weekly MIS reports.',
  },
  {
    id: 'mis-7',
    category: 'MIS',
    question: 'What is variance?',
    modelAnswer:
      'Variance is the difference between a target (or plan) and the actual result. Variance = Actual - Target. A positive variance means you exceeded the target; a negative variance means you fell short. Variance helps management quickly see where performance is above or below expectations.',
  },
  {
    id: 'mis-8',
    category: 'MIS',
    question: 'What is an exception report?',
    modelAnswer:
      'An exception report highlights only the data that falls outside acceptable thresholds or expected norms — for example, SLA below 90%, quality below 95%, or attendance below 80%. Instead of showing all data, it focuses management attention on the items that need action. This saves time and makes reports more actionable.',
  },
  {
    id: 'mis-9',
    category: 'MIS',
    question: 'How do you validate an MIS report?',
    modelAnswer:
      'My validation process: 1) Cross-check totals — row totals should match column totals (cross-footing). 2) Verify formula ranges — make sure SUM/AVERAGE covers the right cells. 3) Reconcile with source data — the report total should match the raw data total. 4) Check for blank or error cells. 5) Have a peer or the data owner review before publishing. 6) Compare with the previous period to spot any unexpected jumps.',
  },
  {
    id: 'mis-10',
    category: 'MIS',
    question: 'How do you ensure report accuracy?',
    modelAnswer:
      'I ensure accuracy through: 1) Starting with clean, validated source data. 2) Using structured Excel tables instead of loose ranges so formulas auto-expand. 3) Using IFERROR to handle missing data gracefully. 4) Building a validation check section that flags if totals do not match. 5) Version control — clearly labeling each report version. 6) Peer review before sending to management. 7) Documenting the data source and calculation logic for each KPI.',
  },

  // Scenario Questions
  {
    id: 'sc-1',
    category: 'Scenario',
    question: 'Your manager says today\'s numbers are wrong. What do you do?',
    modelAnswer:
      '1) Acknowledge and take it seriously — do not get defensive. 2) Ask which specific number or section looks wrong. 3) Re-check the source data — has it been updated or changed? 4) Verify the formulas — are the ranges correct? 5) Reconcile the report total with the source data total. 6) If an error is found, fix it, document what went wrong, and resend with a note. 7) If the data is correct, walk the manager through the calculation to explain the number. 8) Add a validation check to prevent the same issue next time.',
  },
  {
    id: 'sc-2',
    category: 'Scenario',
    question: 'SLA dropped suddenly. How would you investigate?',
    modelAnswer:
      '1) Confirm the drop — is it real or a data issue? 2) Break it down by team — is it one team or across the board? 3) Break it down by time — did it drop at a specific hour or shift? 4) Break it down by ticket type — is it a specific priority or category? 5) Check for volume spikes — was there an unexpected surge in tickets? 6) Check staffing — were agents absent or on break during the spike? 7) Check for system issues — was the ticketing tool down? 8) Present findings with a root cause and a recommendation to prevent recurrence.',
  },
  {
    id: 'sc-3',
    category: 'Scenario',
    question: 'You receive 10,000 messy rows. What is your process?',
    modelAnswer:
      '1) Profile the data — check for blanks, duplicates, inconsistent formats, and outliers. 2) Remove exact duplicates. 3) Clean text — TRIM spaces, standardize case, fix encoding with CLEAN. 4) Standardize categories — e.g., unify "HR" and "Human Resources". 5) Fix dates — convert to a consistent format. 6) Handle blanks — fill with defaults or flag for review. 7) Validate — check row counts before and after cleaning, verify totals. 8) Document the cleaning steps so the process is repeatable. 9) Use Power Query if the cleaning needs to be done regularly.',
  },
  {
    id: 'sc-4',
    category: 'Scenario',
    question: 'Management wants a daily report by 10 AM. How would you design the process?',
    modelAnswer:
      '1) Identify the required KPIs and format the manager expects. 2) Identify the data source and when it gets updated each day. 3) Build a template workbook with formulas that auto-populate from the source data. 4) Use Power Query to automate data import and cleaning. 5) Build the report so it only needs a data refresh each morning — no manual steps. 6) Add validation checks that flag if the data looks incomplete. 7) Set a personal deadline of 9:30 AM to allow time for review. 8) Automate with a scheduled refresh or macro if possible. 9) Have a backup plan if the data is late.',
  },
  {
    id: 'sc-5',
    category: 'Scenario',
    question: 'A stakeholder says your report is incorrect. What would you do?',
    modelAnswer:
      '1) Thank them for flagging it and ask which specific figure or section looks off. 2) Do not defend the report immediately — investigate first. 3) Go back to the source data and trace the calculation step by step. 4) Check if the source data has been updated since the report was generated. 5) If an error is found — fix it, resend with a clear note explaining what was corrected and why. 6) If the report is correct — walk the stakeholder through the calculation to build understanding. 7) Document the issue and add a validation check to catch it in the future. 8) Follow up to ensure they are satisfied with the resolution.',
  },
];
