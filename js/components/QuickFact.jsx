const { useState, useEffect } = React;

const QuickFact = () => {
    const facts = [
        { topic: 'Matemáticas', text: 'El número π (pi) tiene infinitos decimales que no siguen ningún patrón.', icon: 'fa-calculator' },
        { topic: 'Física', text: 'La luz viaja a unos 300.000 kilómetros por segundo en el vacío.', icon: 'fa-bolt' },
        { topic: 'Química', text: 'El diamante y el grafito están hechos exactamente del mismo elemento: Carbono.', icon: 'fa-flask' },
        { topic: 'Astronomía', text: 'Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra.', icon: 'fa-star' },
        { topic: 'Biología', text: 'El ADN humano es un 99.9% idéntico en todas las personas.', icon: 'fa-dna' }
    ];

    const [currentFact, setCurrentFact] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentFact((prev) => (prev + 1) % facts.length);
                setFade(true);
            }, 500);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const fact = facts[currentFact];

    return (
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'opacity 0.5s ease',
            opacity: fade ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'left'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--gradiente-secundario)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}>
                <i className={`fas ${fact.icon}`} style={{ color: 'white' }}></i>
            </div>
            <div>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-acento)',
                    display: 'block',
                    marginBottom: '0.25rem'
                }}>{fact.topic}</span>
                <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                }}>{fact.text}</p>
            </div>
        </div >
    );
};

window.QuickFact = QuickFact;
