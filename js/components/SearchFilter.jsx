const { useState, useMemo } = React;

const SearchFilter = ({ data, openModal }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');

    const categories = [
        { id: 'all', name: 'Todo', icon: 'fa-layer-group', color: '#94a3b8' },
        { id: 'matematicas', name: 'Matemáticas', icon: 'fa-calculator', color: '#f43f5e' },
        { id: 'fisica', name: 'Física', icon: 'fa-atom', color: '#06b6d4' },
        { id: 'quimica', name: 'Química', icon: 'fa-flask', color: '#14b8a6' },
        { id: 'biologia', name: 'Biología', icon: 'fa-dna', color: '#22c55e' },
        { id: 'literatura', name: 'Literatura', icon: 'fa-book-open', color: '#10b981' }
    ];

    const getCategoryFromId = (id) => {
        if (id.startsWith('m-')) return 'matematicas';
        if (id.startsWith('f-')) return 'fisica';
        if (id.startsWith('q-')) return 'quimica';
        if (id.startsWith('b-')) return 'biologia';
        if (id.startsWith('l-')) return 'literatura';
        return 'otro';
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const cat = getCategoryFromId(item.id);
            const matchesType = (currentFilter === 'all')
                ? true
                : (currentFilter === 'literatura' ? item.type === 'literatura' : cat === currentFilter);

            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesType && matchesSearch;
        });
    }, [data, searchQuery, currentFilter]);

    return (
        <React.Fragment>
            {/* Barra de Filtros */}
            <div className="filters-bar">
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8', fontWeight: 800, marginBottom: '0.8rem' }}>
                        <i className="fas fa-layer-group"></i> Explorar Materias
                    </h3>
                    <div className="filter-group">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${currentFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setCurrentFilter(cat.id)}
                            >
                                <i className={`fas ${cat.icon}`} style={{ marginRight: '5px', color: currentFilter === cat.id ? '#fff' : cat.color }}></i>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Buscador */}
                <div className="search-box">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Buscar: Genética, Cálculo, Aritmética..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Buscar guías"
                    />
                </div>
            </div>

            {/* Contador */}
            <div style={{ marginBottom: '1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>
                <span>{filteredData.length} guías encontradas</span>
            </div>

            {/* Grid de Resultados */}
            <div className="guides-grid">
                {filteredData.map(item => (
                    <div
                        key={item.id}
                        className="guide-card"
                        onClick={() => openModal(item, 'guide')}
                    >
                        <div className={`guide-header ${item.bg}`}>
                            <i className={`fas ${item.icon}`}></i>
                            {item.status === 'pronto' && <span className="status-badge">Pronto</span>}
                        </div>
                        <div className="guide-body">
                            <h3 className="guide-title">{item.title}</h3>
                            <p className="guide-desc">{item.desc}</p>
                            <div className="guide-topics">
                                <i className="fas fa-list"></i> {item.subtopics.length} temas
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Estado Vacío */}
            {filteredData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#cbd5e1', fontSize: '2rem' }}>
                        <i className="fas fa-search"></i>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Sin resultados</h3>
                    <p style={{ color: '#64748b' }}>Intenta con otros términos de búsqueda.</p>
                </div>
            )}
        </React.Fragment>
    );
};

window.SearchFilter = SearchFilter;
