import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import Dashboard from "@/pages/Dashboard.tsx";
import Subjectslists from "@/pages/subjects/Lists.tsx";
import SubjectsCreate from "@/pages/subjects/create.tsx";
import Classeslists from "@/pages/classes/list.tsx";
import ClassesCreate from "@/pages/classes/create.tsx";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {Home, BookOpenIcon, GraduationCap} from "lucide-react";
import {Layout} from "@/components/refine-ui/layout/layout.tsx"
import {dataProvider} from "@/providers/data.ts";
import ClassesShow from "@/pages/classes/show.tsx";

function App() {

    return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                  {
                  name: 'dashbaord',
                  list:'/' ,
                  meta: {
                      label: 'Home',
                      icon: <Home/>
                  }
                  },
                  {
                      name:'subjects',
                      list:'/subjects',
                      create:'/subjects/create',
                      meta:{label:'Subjects',icon:<BookOpenIcon />}
                  },
                  {
                      name:'classes',
                      list:'/classes',
                      create:'/classes/create',
                      show:'/classes/show/:id',
                      meta:{
                          label:'Classes',
                          icon:<GraduationCap />}
                  },
              ]}
            >
              <Routes>
                  <Route element = {
                      <Layout>
                          <Outlet />
                      </Layout>
                  }>
                      <Route path={"/"} element={<Dashboard />} />
                    <Route path='subjects' >
                        <Route index element={<Subjectslists />} />
                        <Route path="create" element={<SubjectsCreate/>} />
                    </Route>

                      <Route path='classes' >
                          <Route index element={<Classeslists />} />
                          <Route path="create" element={<ClassesCreate/>} />
                          <Route path="show/:id" element={<ClassesShow />} />
                      </Route>
                  </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
