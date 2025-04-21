import { Helmet } from "react-helmet-async";
import logo from '../assets/logo.png';

export default function SEO({ title, description, image, keywords }) {
    return (
        <Helmet>
            <title>{title && title + ' | '}Woody</title>
            <link rel="icon" type="image/png" href={logo} />
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content="Woody" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={image || logo} />

            {/* Open Graph */}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={image || logo} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="product" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={image || logo} />
        </Helmet>
    )
}