import { Helmet } from "react-helmet-async";
import logo from '../assets/logo.png';

export default function SEO({ title, description, image, keywords }) {
    const siteTitle = title ? `${title} | Woody` : 'Woody';
    const defaultDescription = "Discover our exquisite collection of handcrafted wooden furniture and home decor at Woody.";
    const defaultKeywords = "wooden furniture, home decor, wood crafts";
    
    return (
        <Helmet prioritizeSeoTags>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content="Woody" />
            <meta name="robots" content="index, follow" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || logo} />
            
            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={window.location.href} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || logo} />
            
            {/* Favicon */}
            <link rel="icon" type="image/png" href={logo} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
}