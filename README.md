<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://raw.githubusercontent.com/souz-dev/ProManage-interactive/refs/heads/master/assets/readme-img.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=next.js&color=black" alt="Next;js" />
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React.js" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge" alt="shadcn" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
  </div>
<br/><br/></br>

  <h1 align="center">ProManage Interactive</h1>

   <div align="center">
    A complete dashboard for managing projects and tasks.
    </div>
</div>

## 📋 <a name="table">Sumary</a>

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 💻 [Envs](#env)
5. 💻 [Quick Start](#quick-start)
6. 🤝 [Contributing](#contributing)
7. 👥 [Authors](#authors)




## <a name="introduction">🚀 Introduction</a>

Web application for managing your company's projects. The application allows users to create, edit and delete projects, as well as add, update and monitor the progress of tasks associated with each project.
The dashboard offers a clear and organized view of the status of projects, facilitating efficient
monitoring and management.




## <a name="tech-stack">⚙️ Tech Stack</a>

- TypeScript
- React.js
- Next.js
- Prisma
- Recharts
- Sonner
- TailwindCSS
- Date-fns


## <a name="features">🔋 Features</a>

- **Project creation**: Allows the creation of new projects with detailed information such as name, start and end dates, description and person responsible.
- **Editing Projects**: Allows you to edit information on existing projects.
- **Deleting Projects**: Allows you to delete projects that are no longer needed.
- **Task Management**: Add, edit and delete tasks associated with each project.
- **Progress Monitoring**: View the progress of each project's tasks in percentages.
- **Project Status**: Track the status of projects (active, completed, overdue) with visual indicators.
- **Table and Card View**: Toggle between table and card views for better organization and visualization of projects.

## <a name="envs">💾 Environment Variables</a>

<details>
<summary><code>.env.local</code></summary>

```
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=


```

</details>


## <a name="quick-start">💻 Quick Start</a>
**00 - Prerequisites**

To use this project you must have previously installed the following packages:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager or similar)
- [docker](https://www.docker.com/)
- [prisma](https://www.prisma.io/)
- [postgresql](https://www.postgresql.org/)

**01 - Cloning the Repository**

```bash
git clone https://github.com/souz-dev/ProManage-interactive
cd ProManage-interactive
```

**02 - Installation**

Install/Update the project dependencies using npm:

```bash
npm install
```



Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
Please, check the port.

**03 - Setting Environment Variables**

- Create an .env file in the root of your project and add the following environment variables:
```
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

**04 - Configuring Prisma**

- Apply the migrations to the database:

```
npx prisma migrate dev
```

**05 - Run the Project with Docker**

- Make sure you have Docker installed on your machine. If not, download and install it from the official Docker website.

- Build and run the Docker containers:

```
docker-compose up --build
```
**06 - Run the Project**

```
npm run dev
```
## <a name="contributing">🤝 Contributing</a>

Contributions, issues, and feature requests are welcome!

1. Fork it (<https://github.com/souz-dev/ProManage-interactive>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## <a name="authors">👥 Authors</a>

<table style="border-collapse: collapse; table-layout: auto text-align: left;">

  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">
        <img src="https://avatars.githubusercontent.com/u/72813560?s=400&u=8d8a139a3376a866a0c901dbba3428a876d79b60&v=4" width="60" style="border-radius: 50%; display: block; margin: 0 auto;">
      </td>
      <td style="padding: 10px; border: 1px solid #ddd;">Hiago Souza</td>
      <td style="padding: 10px; border: 1px solid #ddd;">
        <a href="https://www.linkedin.com/in/souz-dev/" target="_blank">LinkedIn</a> |
        <a href="https://github.com/souz-dev" target="_blank">GitHub</a>
      </td>
    </tr>
  </tbody>
</table>
