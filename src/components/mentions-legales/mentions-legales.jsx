import "./mentions-legales.css";

const mentions_legales = () => {
    return (
        <div className="privacy-container">
            <h1>Mentions Légales</h1>
            <p>
                <h2>Éditeur du site</h2>
                <br />Nom : Pellefigue Théo
                <br />Statut : Particulier
                <br />Adresse : 66 avenue des pyréenes, 31830 Plaisance du Touch
                <br />Email : theo.pellefigue@gmail.com
            </p>
            <p>
                <h2>Hébergeur</h2>
                <br />Hébergeur : OVH
                <br />Raison sociale : OVH SAS
                <br />Adresse : 2 rue Kellermann - 59100 Roubaix - France
                <br />Site web : www.ovh.com
            </p>
            <p>
                <h2>Hébergeur</h2>
                <br />Hébergeur : netlify
                <br />Raison sociale : Netlify, Inc.
                <br />Adresse : 101 2nd Street San Francisco, CA 94105 - USA
                <br />Site web : www.netlify.com
            </p>
            <p>
                <h2>Propriété intellectuelle</h2>
                <br />L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, icônes, etc.) est protégé par le droit d’auteur.
                <br />Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation préalable est interdite.
            </p>
            <p>
                <h2>Responsabilité</h2>
                <br />L’éditeur du site s’efforce de fournir des informations aussi précises que possible.
                <br />Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour.
            </p>
            <p>
                <h2>Données personnelles</h2>
                <br />Ce site ne collecte aucune donnée personnelle.
                <br />Aucun formulaire, aucun système de suivi, aucun cookie n’est utilisé.

                <br />Conformément au Règlement Général sur la Protection des Données (RGPD), aucune information personnelle n’est traitée sur ce site.
            </p>
            <p>
                <h2>Cookies</h2>
                <br />Ce site n’utilise aucun cookie nécessitant le consentement de l’utilisateur.
            </p>
            <p>
                <h2>Droit applicable</h2>
                <br />Le présent site est soumis au droit français.
            </p>
        </div>
    );
};

export default mentions_legales;