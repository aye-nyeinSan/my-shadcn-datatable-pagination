# shadcn-datatable-pagination

A flexible and customizable pagination solution for Shadcn UI-based data tables, leveraging TanStack Table's headless architecture.

#### 📦 Installation
```
npm i @rubi_who/shadcn-table-pagination
```
 ### 🛠️ Usage
```javascript
import { DataTable, type ColumnDef } from "@rubi_who/shadcn-table-pagination"

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
const data = [
  { id: "dev-1", name: "John Doe", email: "Jon@gmail.com" },
  { id: "dev-2", name: "John Doe", email: "Jon@gmail.com" },
  { id: "dev-3", name: "John Doe", email: "Jon@gmail.com" },

  { id: "dev-4", name: "John Doe", email: "Jon@gmail.com" },
  { id: "dev-5", name: "John Doe", email: "Jon@gmail.com" },
];
export default function TestLibPage() { 
    return (
        <div className="container">
        <h1 className="text-2xl">Test Library Page</h1>
            <p>This page is used to test the library functionality.</p>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
```

### 🔮 Example Output:
![image](https://github.com/user-attachments/assets/9ef9916e-ed49-4a37-828b-f8d6f1c6468a)

### 🦷 Features
- customize items per page on the table
- text for no data available for the table
- customize styling using tailwind classes

<img src="https://github.com/user-attachments/assets/1cba9729-8774-4131-948c-56dcfb676128" width="300" height="150">

### 📄 License
MIT
