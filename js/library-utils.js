/* --- Utilidades Compartidas para Bibliotecas --- */

function getCategoryColor(id) {
    if (id.startsWith('m-')) return { name: 'matematicas', color: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)' };
    if (id.startsWith('f-')) return { name: 'fisica', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' };
    if (id.startsWith('q-')) return { name: 'quimica', color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)' };
    if (id.startsWith('b-')) return { name: 'biologia', color: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' };
    if (id.startsWith('l-')) return { name: 'literatura', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' };
    return { name: 'otro', color: '#3b82f6', gradient: 'var(--gradiente-secundario)' };
}

export function openModal(item, type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';

    let contentHTML = '';
    const cat = getCategoryColor(item.id);

    if (type === 'guide') {
        const subtopics = item.subtopics.map(sub =>
            `<li><a href="${sub.url}" style="color: var(--slate-700); text-decoration: none; display: flex; align-items: center; gap: 8px; font-weight: 500;"><i class="fas fa-chevron-right" style="color: ${cat.color}; font-size: 0.7rem;"></i> ${sub.name}</a></li>`
        ).join('');

        contentHTML = `
            <div class="modal-content">
                <div class="modal-header" style="padding: 2.5rem; color: white; display: flex; align-items: center; gap: 1.5rem; background: ${cat.gradient}; position: relative; overflow: hidden;">
                    <div style="position: absolute; right: -20px; bottom: -20px; font-size: 10rem; opacity: 0.1;">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <i class="fas ${item.icon}" style="font-size: 3.5rem; position: relative; z-index: 10;"></i>
                    <div style="position: relative; z-index: 10;">
                        <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; font-weight: 800; display: block; margin-bottom: 0.5rem;">Guía de Estudio</span>
                        <h2 style="margin: 0; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em;">${item.title}</h2>
                    </div>
                </div>
                <div class="modal-body" style="padding: 3rem;">
                    <p style="font-size: 1.15rem; color: var(--slate-600); line-height: 1.7; margin-bottom: 2.5rem; font-weight: 400;">${item.desc}</p>
                    <h3 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--slate-400); font-weight: 800; margin-bottom: 1.5rem; border-bottom: 2px solid var(--slate-100); padding-bottom: 0.5rem;">Temas del módulo</h3>
                    <ul class="subtopics-list" style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
                        ${subtopics || '<li style="color: var(--slate-400); font-style: italic;">Próximamente estaremos añadiendo contenido aquí.</li>'}
                    </ul>
                    <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 1.25rem; padding-top: 2rem; border-top: 1px solid var(--slate-100);">
                        <button class="btn btn-secondary close-modal">Cerrar</button>
                        ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" class="btn" style="background: ${cat.gradient}; color: white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)">Comenzar Lectura</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Book Modal
        const scienceTags = item.science ? item.science.map(tag => `<span class="tag" style="background: rgba(255,255,255,0.05); color: #fef3c7; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(255,255,255,0.1);">${tag}</span>`).join(' ') : '';
        const subtopics = item.subtopics ? item.subtopics.map(sub =>
            `<li><a href="${sub.url}" style="color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; transition: color 0.3s;"><i class="fas fa-bookmark" style="font-size: 0.7rem; color: var(--color-acento); opacity: 0.7;"></i> ${sub.name}</a></li>`
        ).join('') : '';

        contentHTML = `
            <div class="modal-content dark" style="background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1); max-width: 800px;">
                <div class="modal-body" style="padding: 3.5rem;">
                    <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 300px;">
                            <div style="display: inline-block; background: var(--color-acento); color: #0f172a; padding: 4px 12px; border-radius: 4px; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 1px;">Mundo Literario</div>
                            <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 0.5rem; color: #fef3c7; font-family: var(--font-display); line-height: 1.1;">${item.title}</h2>
                            <p class="author" style="font-size: 1.1rem; color: #94a3b8; font-weight: 600; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.15em;">Por ${item.author}</p>
                            <p class="desc" style="font-size: 1.1rem; line-height: 1.8; color: #94a3b8; margin-bottom: 2.5rem; font-weight: 400;">${item.desc}</p>
                            
                            <div class="tags-container" style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
                                ${scienceTags}
                            </div>
                        </div>

                        ${subtopics ? `
                        <div style="width: 240px; background: rgba(255,255,255,0.03); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.05);">
                             <h3 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b; margin-bottom: 1.5rem; font-weight: 800;">Análisis Científico</h3>
                             <ul class="subtopics-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                                 ${subtopics}
                             </ul>
                        </div>` : ''}
                    </div>

                    <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 1.5rem; margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05);">
                           <button class="btn btn-secondary close-modal" style="background: transparent; color: #64748b; border-color: #334155;">Cerrar</button>
                           ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" class="btn" style="background: var(--color-acento); color: #0f172a; font-weight: 800; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.2);">Explorar Mundo</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    modal.innerHTML = contentHTML;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Para compatibilidad con el script inline de guias.html
window.openModal = openModal;
