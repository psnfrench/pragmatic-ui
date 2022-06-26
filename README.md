# Pragmatic UI

<h2>For adding the sidebar component to another application:</h2>

Copy the SidebarDemo.tsx and SideBar.tsx files and paste them in the desired location in your project.

Rename SidebarDemo to Sidebar and change imports/exports.

Import the Sidebar component and place in desired location on page.

Change the navItems in Sidebar component to match desired text, key, icon and path.
For path change text in onClick function i.e:

    onClick: () => navigate('/old')

becomes:

    onClick: () => navigate('/new')

Ensure the routes match existing routes set up in your AppRouter.tsx. If you do not have an AppRouter.tsx, you can use this AppRouter.tsx.
Replace the Demo imports with your pages.
I recommend removing AppRouterProps unless you require this for your components.
For a basic page, use the first "Home" example and alter the path and element to suit.

<b>**_ NOTE _**</b>

If the application was not created using webpack, change all svg imports from:

    import { ReactComponent as DMExpanded } from '../images/DMExpanded.svg';

to:

    import DMExpanded from '../images/DMExpanded.svg';


 