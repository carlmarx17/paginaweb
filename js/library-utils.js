/* --- Utilidades Compartidas para Bibliotecas --- */

export function openModal(item, type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';

    let contentHTML = '';

    if (type === 'guide') {
        const subtopics = item.subtopics.map(sub =>
            `<li><a href="${sub.url}" target="_blank">${sub.name}</a></li>`
        ).join('');

        contentHTML = `
            <div class="modal-content">
                <div class="modal-header ${item.bg}" style="padding: 2rem; color: white; display: flex; align-items: center; gap: 1.5rem; background-size: cover; background-position: center;">
                    <i class="fas ${item.icon}" style="font-size: 3rem; opacity: 0.8;"></i>
                    <h2 style="margin: 0; font-size: 1.75rem; font-weight: 800;">${item.title}</h2>
                </div>
                <div class="modal-body" style="padding: 2.5rem;">
                    <p style="font-size: 1.1rem; color: #475569; line-height: 1.6; margin-bottom: 2rem;">${item.desc}</p>
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 800; margin-bottom: 1rem;">Temas Disponibles</h3>
                    <ul class="subtopics-list" style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
                        ${subtopics || '<li style="color: #94a3b8; font-style: italic;">Próximamente</li>'}
                    </ul>
                    <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9;">
                        <button class="btn btn-secondary close-modal">Cerrar</button>
                        ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" target="_blank" class="btn btn-primary">Ver Guía Completa</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Book Modal
        const scienceTags = item.science ? item.science.map(tag => `<span class="tag" style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">${tag}</span>`).join(' ') : '';
        const subtopics = item.subtopics ? item.subtopics.map(sub =>
            `<li><a href="${sub.url}" target="_blank" style="color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 8px;"><i class="fas fa-chevron-right" style="font-size: 0.6rem; opacity: 0.5;"></i> ${sub.name}</a></li>`
        ).join('') : '';

        contentHTML = `
            <div class="modal-content dark" style="background: #1e1b29; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                <div class="modal-body" style="padding: 3rem;">
                    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 250px;">
                            <h2 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #fef3c7; font-family: var(--font-display);">${item.title}</h2>
                            <p class="author" style="font-size: 1.1rem; color: #94a3b8; font-weight: 600; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.1em;">${item.author}</p>
                            <p class="desc" style="font-size: 1.05rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 2rem;">${item.desc}</p>
                            
                            <div class="tags-container" style="display: flex; gap: 0.5rem; margin-bottom: 2.5rem;">
                                ${scienceTags}
                            </div>
                        </div>

                        ${subtopics ? `
                        <div style="width: 200px;">
                             <h3 style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 1rem;">Análisis</h3>
                             <ul class="subtopics-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem;">
                                 ${subtopics}
                             </ul>
                        </div>` : ''}
                    </div>

                    <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05);">
                           <button class="btn btn-secondary close-modal" style="background: transparent; color: #94a3b8; border-color: #334155;">Cerrar</button>
                           ${item.mainUrl !== '#' ? `<a href="${item.mainUrl}" target="_blank" class="btn btn-primary" style="background: var(--color-acento); box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.3);">Explorar Mundo</a>` : ''}
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
