export const MenuItems = [
    {
        title: "Commercial",
        path: "/marketing",
        cName: "dropdown-link",
    },
    {
        title: "Design",
        path: "/design",
        cName: "dropdown-link",
    },
    {
        title: "Site Web",
        path: "/site",
        cName: "dropdown-link",
    },
    {
        title: "Development",
        path: "/development",
        cName: "dropdown-link",
    },
];

export const inputsSign = [
    {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
    },
    {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "It should be a valid email address!",
        required: true,
    },
    {
        id: 3,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
    },
];
export const inputsLogin = [
    {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage: "",
        required: true,
    },
    {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage: "",
        required: true,
    },
];
export const inputsService = [
    {
        id: 1,
        name: "titleService",
        type: "text",
        placeholder: "Title",
        errorMessage: "",
        label: "Title",
        required: true,
    },
    {
        id: 2,
        name: "imageService",
        type: "file",
        errorMessage: "",
        label: "Select image:",
        accept: "image/*",
        required: true,
    },
];
export const inputsPrice = [
    {
        id: 1,
        name: "basicService",
        type: "number",
        placeholder: "Basic",
        errorMessage: "",
        required: true,
    },
    {
        id: 2,
        name: "standardService",
        type: "number",
        placeholder: "Standard",
        errorMessage: "",
        required: true,
    },
    {
        id: 3,
        name: "premiumService",
        type: "number",
        placeholder: "Premium",
        errorMessage: "",
        required: true,
    },
];
export const DropCard = [
    {
        title: "test",
    },
    {
        title: "Mark",
    },
];
export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const serviceData = [
    {
        imageurl: "Marketing.jpg",
        name: "Marketing",
        description: "..",
    },
    {
        imageurl: "white.jpg",
        name: "Development",
        description: "..",
    },
    {
        imageurl: "white.jpg",
        name: "Consulting",
        description: "..",
    },
    {
        imageurl: "white.jpg",
        name: "Design",
        description: "..",
    },
    {
        imageurl: "white.jpg",
        name: "Art",
        description: "..",
    },
    {
        imageurl: "white.jpg",
        name: "Autre",
        description: "..",
    },
];
export const CategorieDetail = [
    {
        Image: "white.jpg",
        description:
            "lorem div tutorial using only html and css if you have questions  ",
        prize: "0 DZ",
        userName: "Iyes Aboura",
        userPic: "white.jpg",
    },
    {
        Image: "white.jpg",
        description: "lorem div tutorial",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
    {
        Image: "white.jpg",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel, to head  down to the comment section",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
    {
        Image: "white.jpg",
        description: "..",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
    {
        Image: "white.jpg",
        description: "..",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
    {
        Image: "white.jpg",
        description: "..",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
    {
        Image: "white.jpg",
        description: "..",
        prize: "0 DZ",
        userName: "Chami Meriem",
        userPic: "Marketing.jpg",
    },
];
export const DataAccordion = [
    {
        service: "UI",
        Image: "Marketing.jpg",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head  down to the comment section",
        prize: "30000DA",
    },
    {
        service: "UI",
        Image: "Marketing.jpg",
        description: "i will make a UI.",
        prize: "30000DA",
    },
    {
        service: "UI",
        Image: "Marketing.jpg",
        description: "i will make a UI.",
        prize: "30000DA",
    },
    {
        service: "UI",
        Image: "Marketing.jpg",
        description: "i will make a UI.",
        prize: "30000DA",
    },
];
export const DataBrowse = [
    {
        Image: "Marketing.jpg",
        title: "Titre",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head  down to the comment section",
        prizeMin: "10000DA",
        prizeMax: "30000DA",
        category: "Marketing",
    },
    {
        Image: "Marketing.jpg",
        title: "Titre",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head  down to the comment section",
        prizeMin: "10000DA",
        prizeMax: "30000DA",
        category: "Marketing",
    },
    {
        Image: "Marketing.jpg",
        title: "Titre",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head  down to the comment section",
        prizeMin: "10000DA",
        prizeMax: "30000DA",
        category: "Marketing",
    },
    {
        Image: "Marketing.jpg",
        title: "Titre",
        description:
            "simple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head down to the comment sectionsimple scroll bar in div tutorial using only html and css if you have questions concerning this video feel free to head  down to the comment section",
        prizeMin: "10000DA",
        prizeMax: "30000DA",
        category: "Marketing",
    },
];

export const SliderData = [
    {
        Image: "white.jpg",
    },
    {
        Image: "white.jpg",
    },
    {
        Image: "white.jpg",
    },
    {
        Image: "white.jpg",
    },
];
export const Imageresponsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const CategoryData = [
    { category: " Marketing", value: " Marketing" },
    { category: " Programmation", value: " Programmation" },
    { category: " business", value: " business" },
];




