import { useRoutes } from "react-router-dom"
import * as paths from './const';
import { MainPage, NotFoundPage } from "src/pages";
import { CareerDetailPage, CareerMainPage } from "src/pages/career";
import { ProjectDetailPage, ProjectMainPage } from "src/pages/project";
import { MainLayout } from "src/layouts";

export const MainRouter = () => {

    const mainRoutes = useRoutes([
        {
            path: paths.ROUTE_ROOT,
            element: <MainLayout />,
            children: [
                { index: true, element: <MainPage /> }, // 기본 메인 페이지

                //  Career 
                {
                    path: paths.ROUTE_CAREER,
                    children: [
                        { index: true, element: <CareerMainPage /> },
                        { path: ":id", element: <CareerDetailPage /> }
                    ]
                },

                // Project
                {
                    path: paths.ROUTE_PROJ,
                    children: [
                        { index: true, element: <ProjectMainPage /> },
                        { path: ":id", element: <ProjectDetailPage /> }
                    ]
                },

                // Main > Detail 허용
                { path: "career/:id", element: <CareerDetailPage /> },
                { path: "proj/:id", element: <ProjectDetailPage /> }
            ]
        },
        {
            path: "*",
            element: <NotFoundPage />
        }
    ]);

    return mainRoutes;
}