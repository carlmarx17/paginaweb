import os
import re

def repair_quizzes():
    base_dir = '/home/carlmarxt/Documents/Sitio web/pages/articles'
    
    for filename in os.listdir(base_dir):
        if filename.endswith('.html') and filename not in ['template_premium.html', 'template.html']:
            file_path = os.path.join(base_dir, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract content from injected markers if present
            if '<!-- Injected Content Starts Here -->' in content:
                # We want to keep the whole file structure but repair the middle part
                pass
            else:
                continue

            # NEW APPROACH: Repairing broken quizzes from previous regex failures
            # Quizzes typically have 4 options (A, B, C, D)
            # We look for the main content block
            
            # 1. First, let's fix the equation detection which was a bit too aggressive
            content = content.replace('<div class="ecuacion">99.7%</div>', '<div class="pregunta-texto">99.7%</div>')

            # 2. Robust Quiz Restoration
            # If a quiz container only has one option, it's probably broken
            def quiz_fixer(match):
                full_match = match.group(0)
                # If it already looks correct (has many options), leave it
                if full_match.count('checkAnswer') > 1:
                    return full_match
                
                # If it's broken (only 1 or 0 options shown), we need to recover from the original if possible
                # But we don't have the original here. 
                # HOWEVER, I can try to fix the general regex in the main script instead.
                return full_match

            # Let's just fix the regex in the main migrate_pages.py and rerun it with a cleaner base.
            pass

def main():
    # I will rewrite the main migration script to be extremely careful with the options div
    script_path = '/home/carlmarxt/Documents/Sitio web/scripts/migrate_pages.py'
    
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write('''import os
import re

def migrate():
    base_dir = '/home/carlmarxt/Documents/Sitio web/pages/articles'
    template_path = os.path.join(base_dir, 'template_premium.html')
    noticias_path = '/home/carlmarxt/Documents/Sitio web/pages/components/noticias-section.html'
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    with open(noticias_path, 'r', encoding='utf-8') as f:
        noticias_content = f.read()
    
    ignore_files = ['template_premium.html', 'template.html']
    
    for filename in os.listdir(base_dir):
        if filename.endswith('.html') and filename not in ignore_files:
            file_path = os.path.join(base_dir, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract Title
            title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
            title = title_match.group(1).strip() if title_match else filename.replace('.html', '')
            title = title.split(' - ')[0].split(' | ')[0]
            
            # Extract Main Content
            if '<!-- Injected Content Starts Here -->' in content:
                content_start = '<!-- Injected Content Starts Here -->'
                content_end = '<!-- Injected Content Ends Here -->'
                start_idx = content.find(content_start)
                end_idx = content.find(content_end)
                main_content = content[start_idx + len(content_start):end_idx].strip()
            else:
                article_match = re.search(r'<article.*?>(.*?)</article>', content, re.IGNORECASE | re.DOTALL)
                if article_match:
                    main_content = article_match.group(1).strip()
                else:
                    main_match = re.search(r'<main.*?>(.*?)</main>', content, re.IGNORECASE | re.DOTALL)
                    main_content = main_match.group(1).strip() if main_match else content

            # --- CLEANUP PHASE (Start from raw-ish data) ---
            # Remove previous premium wrappers but KEEP the inner content
            main_content = re.sub(r'<div class="pregunta-container">.*?<h3 class="pregunta-texto">(.*?)</h3>.*?<div class="opciones-grid">(.*?)</div>.*?<div id=".*?" class="feedback-quiz"></div>.*?</div>', r'<div>\1</div><div>\2</div>', main_content, flags=re.DOTALL)
            main_content = main_content.replace('class="imagen-premium"', '')
            main_content = main_content.replace('class="opcion"', '')
            main_content = main_content.replace('<div class="video-wrapper">', '').replace('</iframe></div>', '</iframe>')
            main_content = main_content.replace('<div class="ecuacion">', '<div>')
            
            # --- ENHANCEMENT PHASE ---
            
            # 1. Images
            main_content = re.sub(r'<img\s+', r'<img class="imagen-premium" ', main_content)
            
            # 2. Videos
            main_content = re.sub(r'(<iframe.*?>.*?</iframe>)', r'<div class="video-wrapper">\1</div>', main_content, flags=re.DOTALL)
            
            # 3. Quizzes (The "Nuclear" Regex to capture all options)
            def quiz_replacer(match):
                q_text = match.group(1).strip()
                options_block = match.group(2).strip()
                
                # Check if it's a real question num (1., 2., etc.)
                if not re.match(r'^\d+\.', q_text): return match.group(0)
                
                # Extract QID
                qid_match = re.search(r'[\'"](q\d+)[\'"]', options_block)
                qid = qid_match.group(1) if qid_match else "feedback"
                
                # Important: Process all inner divs as options if they have checkAnswer
                options_html = re.sub(r'<div\s+onclick="checkAnswer', r'<div class="opcion" onclick="checkAnswer', options_block)
                
                return f"""
<div class="pregunta-container">
    <h3 class="pregunta-texto">{q_text}</h3>
    <div class="opciones-grid">
        {options_html}
    </div>
    <div id="{qid}" class="feedback-quiz"></div>
</div>"""

            # This pattern matches <div>#: Question</div> <div> ALL OPTIONS </div>
            # We use a greedy match for the second div's content to ensure we get all options
            main_content = re.sub(r'<div>(\d+\..*?)</div>\s*<div>\s*((?:<div\s+onclick="checkAnswer.*?</div>\s*)+|.*?checkAnswer.*?)</div>', quiz_replacer, main_content, flags=re.DOTALL)

            # 4. Equations
            equation_keywords = r'P\(|μ|σ|Σ|=|×|\+|-|/|\\|√|λ|∞|∫|∆'
            def equation_replacer(match):
                text = match.group(1).strip()
                if 2 < len(text) < 100 and re.search(equation_keywords, text) and '<' not in text:
                    return f'<div class="ecuacion">{text}</div>'
                return match.group(0)
            
            main_content = re.sub(r'<div>\s*([^<]+)\s*</div>', equation_replacer, main_content)

            # Final Wrap
            new_html = template.replace('{{TITLE}}', title)
            # Use the first paragraph for description
            desc_match = re.search(r'<p>(.*?)</p>', main_content, re.IGNORECASE | re.DOTALL)
            description = re.sub(r'<.*?>', '', desc_match.group(1).strip()) if desc_match else "Guía premium."
            new_html = new_html.replace('{{DESCRIPTION}}', description[:150] + "...")
            new_html = new_html.replace('{{CONTENT}}', f'<!-- Injected Content Starts Here -->\n{main_content}\n<!-- Injected Content Ends Here -->')
            new_html = new_html.replace('{{NOTICIAS}}', noticias_content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            
            print(f"Finalized: {filename}")

if __name__ == "__main__":
    migrate()
''')
    print("Migration script updated.")

if __name__ == "__main__":
    main()
