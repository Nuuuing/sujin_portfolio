import { useRoutes } from "react-router-dom"
import * as paths from './const';
import { DashLayout } from "src/layouts";
import { MainPage, NotFoundPage } from "src/pages";
import { CareerDetailPage, CareerMainPage } from "src/pages/career";
import { ProjectDetailPage, ProjectMainPage } from "src/pages/project";

export const MainRouter = () => {

    const mainRoutes = useRoutes([
        {
            path: paths.ROUTE_ROOT,
            children: [
                {
                    element: <DashLayout />,
                    children: [
                        {
                            path: paths.ROUTE_MAIN,
                            element: <MainPage />
                        },
                        {
                            path: paths.ROUTE_CAREER,
                            element: <CareerMainPage />
                        },
                        {
                            path: paths.ROUTE_CAREER_DETAIL,
                            element: <CareerDetailPage />
                        },
                        {
                            path: paths.ROUTE_PROJ,
                            element: <ProjectMainPage />
                        },
                        {
                            path: paths.ROUTE_PROJ_DETAIL,
                            element: <ProjectDetailPage />
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            element: <NotFoundPage />
        }
    ]);

    return mainRoutes;
}