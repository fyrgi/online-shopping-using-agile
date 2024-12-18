import { useAppContext } from "@/contexts/useAppContext";
import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons/faSignIn";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import { faShirt } from "@fortawesome/free-solid-svg-icons/faShirt";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons/faScrewdriverWrench";
import { Dropdown, MenuProps } from "antd";

const activeNavLinkStyles = {
    backgroundColor: "#2B6CB0", // Active state background color (blue)
    color: "#FFFFFF", // Active state text color
};

const hoverNavLinkStyles = {
    backgroundColor: "#4A5568", // Hover background color (dark gray)
    color: "#FFFFFF", // Hover text color
};

const activeAdminStyles = {
    fontWeight: "bolder"
};

const adminLinks: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <NavLink
                style={({ isActive }) => ({
                    ...(isActive ? activeAdminStyles : {}),
                })}
                to={'/admin/categories'}
            >
                <span>Categories</span>
            </NavLink>
        ),
        icon: <FontAwesomeIcon
            className="icon"
            icon={faBoxArchive}
        />
    },
    {
        key: '2',
        label: (
            <NavLink
                style={({ isActive }) => ({
                    ...(isActive ? activeAdminStyles : {}),
                })}
                to={'/admin/products'}
            >
                <span>Products</span>
            </NavLink>
        ),
        icon: <FontAwesomeIcon
            className="icon"
            icon={faShirt}
        />,
    },
    {
        key: '3',
        label: (
            <NavLink
                style={({ isActive }) => ({
                    ...(isActive ? activeAdminStyles : {}),
                })}
                to={'/admin/contact'}
            >
                <span>Messages</span>
            </NavLink>
        ),
        icon: <FontAwesomeIcon
            className="icon"
            icon={faMessage}
        />
    },
];

const navigation = [
    {
        name: "Home", href: "/", icon: <FontAwesomeIcon
            className="icon"
            icon={faHome}
        />
    },
    {
        name: "Log In", href: "/login", icon: <FontAwesomeIcon
            className="icon"
            icon={faSignIn}
        />
    },
    {
        name: "Help", href: "/help", icon: <FontAwesomeIcon
            className="icon"
            icon={faQuestionCircle}
        />
    },
    // { It is better to have this be in login page itself
    //     name: "Register", href: "/register", icon: <FontAwesomeIcon
    //         className="icon"
    //         icon={faAddressBook}
    //     />
    // },
];

export default function Layout() {
    const { user, logout } = useAppContext();
    console.log(user?.id);

    return (
        <>
            {/* Eye-catching Header */}
            <header className="header">
                <NavLink to="/" className={"logo-link-styles"}>
                    <div className="header-logo">Cool Fashion</div>
                </NavLink>
            </header>

            {/* Navigation */}
            <nav className="nav">
                {/* Navigation Links */}
                <div className="inner-nav">
                    {navigation.map((item) => {
                        if (item.name === "Log In" && user) { //We want to access login and we are logged in, then change it to Log out
                            return <a
                                key={item.name}
                                href="#"
                                className="nav-links"
                                style={({ ...hoverNavLinkStyles })}
                                onClick={() => logout()}
                            >
                                {item.icon}
                                <span>Logout</span>
                            </a>
                        }
                        if (item.name === "Register" && user) {
                            // take out the register nav if someone is logged in
                            return null;
                        }
                        return <NavLink
                            key={item.name}
                            to={item.href}
                            className="nav-links"
                            style={({ isActive }) => ({
                                ...(isActive ? activeNavLinkStyles : {}),
                                ...(!isActive ? hoverNavLinkStyles : {}),
                            })}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    })}
                    {!!user && <>

                        {/* Add favorite page link here*/}

                        {user.admin && <>
                            <Dropdown menu={{ items: adminLinks }}>
                                <a style={hoverNavLinkStyles} href="#" role="button" className="nav-links" onClick={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faScrewdriverWrench}
                                    />
                                    <span>Admin</span>
                                </a>
                            </Dropdown>
                        </>}

                        {!!user && <>
                            <NavLink
                                to={`/wishlist/${user.id}`}
                                className="nav-links"
                                style={({ isActive }) => ({
                                    ...(isActive ? activeNavLinkStyles : {}),
                                    ...(!isActive ? hoverNavLinkStyles : {}),
                                })}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faHeart}
                                />
                                <span>Your Wishlist</span>
                            </NavLink>
                        </>}
                    </>}
                </div>
            </nav>

            {/* Main Content */}
            <main className="mt-12">
                <Outlet />
            </main>
        </>
    );
}
