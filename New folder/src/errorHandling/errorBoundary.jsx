import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/lottie/errorPageLoad.json"; // Lottie animation JSON

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error in Suspense Component:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.container}>
                    <Lottie animationData={errorAnimation} style={styles.animation} />
                </div>
            );
        }
        return this.props.children;
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "20px",
        textAlign: "center",
    },
    animation: {
        width: "50%", // Default size for larger screens
        maxWidth: "300px", // Ensures it doesn't get too big
    },
    text: {
        fontSize: "1.5rem",
        marginTop: "10px",
    },
};

// ✅ RESPONSIVE MEDIA QUERY
const responsiveStyles = `
    @media (max-width: 600px) {
        .error-text { font-size: 1.2rem; } 
        .error-animation { width: 80%; } 
    }
`;

// Inject CSS into the page
const styleTag = document.createElement("style");
styleTag.innerHTML = responsiveStyles;
document.head.appendChild(styleTag);

export default ErrorBoundary;
