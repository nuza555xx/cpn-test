import Head from 'next/head';

type HeaderProps = {
    title: string;
    description: string;
    author?: string;
    keywords?: string[];
    ogImage?: string;
};

export default function CustomHead(props: HeaderProps) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name='description' content={props.description} />
            <meta name='keywords' content={props.keywords?.join(',')} />
            <meta name='author' content={props.author} />
            <meta name='robots' content='index, follow' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, user-scalable=no'
            />
            <link rel='icon' href='/favicon.ico' />

            {/* Open Graph Tags for Social Media */}
            <meta property='og:title' content={props.title} />
            <meta property='og:description' content={props.description} />
            <meta property='og:url' content='https://www.nuchaiwongthon.info' />
            <meta property='og:image' content={props.ogImage} />
            <meta property='og:type' content='website' />

            {/* Twitter Card Tags for Social Media */}
            <meta name='twitter:title' content={props.title} />
            <meta name='twitter:description' content={props.description} />
            <meta name='twitter:url' content='https://www.nuchaiwongthon.info' />
            <meta name='twitter:image' content={props.ogImage} />
            <meta name='twitter:card' content='summary_large_image' />
        </Head>
    );
}
