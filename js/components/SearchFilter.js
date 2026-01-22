const { useState, useMemo, createElement: h, Fragment } = React;

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

    return h(Fragment, null,
        // Barra de Filtros
        h('div', { className: 'filters-bar' },
            h('div', { style: { flex: 1 } },
                h('h3', { style: { fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8', fontWeight: 800, marginBottom: '0.8rem' } },
                    h('i', { className: 'fas fa-layer-group' }),
                    ' Explorar Materias'
                ),
                h('div', { className: 'filter-group' },
                    categories.map(cat => (
                        h('button', {
                            key: cat.id,
                            className: `filter-btn ${currentFilter === cat.id ? 'active' : ''}`,
                            onClick: () => setCurrentFilter(cat.id)
                        },
                            h('i', {
                                className: `fas ${cat.icon}`,
                                style: { marginRight: '5px', color: currentFilter === cat.id ? '#fff' : cat.color }
                            }),
                            cat.name
                        )
                    ))
                )
            ),
            // Buscador
            h('div', { className: 'search-box' },
                h('i', { className: 'fas fa-search search-icon' }),
                h('input', {
                    type: 'text',
                    placeholder: 'Buscar: Genética, Cálculo, Aritmética...',
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    'aria-label': 'Buscar guías'
                })
            )
        ),

        // Contador
        h('div', { style: { marginBottom: '1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 } },
            h('span', null, `${filteredData.length} guías encontradas`)
        ),

        // Grid de Resultados
        h('div', { className: 'guides-grid' },
            filteredData.map(item => (
                h('div', {
                    key: item.id,
                    className: `guide-card category-${getCategoryFromId(item.id)}`,
                    onClick: () => openModal(item, 'guide')
                },
                    h('div', { className: `guide-header ${item.bg}` },
                        h('i', { className: `fas ${item.icon}` }),
                        item.status === 'pronto' && h('span', { className: 'status-badge' }, 'Pronto')
                    ),
                    h('div', { className: 'guide-body' },
                        h('h3', { className: 'guide-title' }, item.title),
                        h('p', { className: 'guide-desc' }, item.desc),
                        h('div', { className: 'guide-topics' },
                            h('i', { className: 'fas fa-list' }),
                            ` ${item.subtopics.length} temas`
                        )
                    )
                )
            ))
        ),

        // Estado Vacío
        filteredData.length === 0 && h('div', { style: { textAlign: 'center', padding: '4rem 1rem' } },
            h('div', { style: { width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#cbd5e1', fontSize: '2rem' } },
                h('i', { className: 'fas fa-search' })
            ),
            h('h3', { style: { fontSize: '1.2rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' } }, 'Sin resultados'),
            h('p', { style: { color: '#64748b' } }, 'Intenta con otros términos de búsqueda.')
        )
    );
};

window.SearchFilter = SearchFilter;
