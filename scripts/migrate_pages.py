import os
import re

def migrate():
    base_dir = '/home/carlmarxt/Documents/Sitio web/pages/articles'
    template_path = os.path.join(base_dir, 'template_premium.html')
    noticias_path = '/home/carlmarxt/Documents/Sitio web/pages/components/noticias-section.html'
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    with open(noticias_path, 'r', encoding='utf-8') as f:
        noticias_content = f.read()
    
    # Files to ignore
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
            # We need to be careful here if the file is already migrated
            if '<!-- Injected Content Starts Here -->' in content:
                content_start = '<!-- Injected Content Starts Here -->'
                content_end = '<!-- Injected Content Ends Here -->'
                start_idx = content.find(content_start)
                end_idx = content.find(content_end)
                if start_idx != -1 and end_idx != -1:
                    main_content = content[start_idx + len(content_start):end_idx].strip()
            else:
                article_match = re.search(r'<article class="content-article">(.*?)</article>', content, re.IGNORECASE | re.DOTALL)
                if article_match:
                    main_content = article_match.group(1).strip()
                else:
                    main_match = re.search(r'<main.*?>(.*?)</main>', content, re.IGNORECASE | re.DOTALL)
                    main_content = main_match.group(1).strip() if main_match else content

            # --- PREMIM CONTENT ENHANCEMENT ---
            
            # 1. Enhance Images
            main_content = re.sub(r'<img\s+(?!class=["\']imagen-premium)', r'<img class="imagen-premium" ', main_content)
            
            # 2. Enhance Videos (iframe)
            main_content = re.sub(r'(?<!<div class="video-wrapper">)\s*(<iframe.*?>.*?</iframe>)\s*(?!</div>)', r'\n<div class="video-wrapper">\n\1\n</div>\n', main_content, flags=re.DOTALL)
            
            # 3. Enhance Quizzes
            # First, normalize options that might have been partially migrated
            main_content = main_content.replace('class="opcion"', '')
            
            # Define a more robust quiz pattern
            # It looks for a question followed by a container of options
            def quiz_replacer(match):
                question_text = match.group(1).strip()
                options_html = match.group(2).strip()
                
                # Extract quiz ID
                quiz_id_match = re.search(r'[\'"](q\d+)[\'"]', options_html)
                quiz_id = quiz_id_match.group(1) if quiz_id_match else "quiz_feedback"
                
                # Add class 'opcion' to each option div
                # We look for divs that have checkAnswer
                options_html = re.sub(r'<div\s+onclick="checkAnswer', r'<div class="opcion" onclick="checkAnswer', options_html)
                
                return f"""
<div class="pregunta-container">
    <div class="pregunta-texto"><h3>{question_text}</h3></div>
    <div class="opciones-grid">
        {options_html}
    </div>
    <div id="{quiz_id}" class="feedback-quiz"></div>
</div>"""

            # This pattern matches: <div>1. Question</div> <div> <div onclick>...</div> ... </div>
            # We use a non-greedy .*? to avoid capturing multiple quizzes as one
            main_content = re.sub(r'<div>(\d+\..*?)</div>\s*<div>\s*((?:<div\s+onclick="checkAnswer.*?</div>\s*)+)</div>', quiz_replacer, main_content, flags=re.DOTALL)

            # 4. Enhance Equations
            equation_keywords = r'P\(|μ|σ|Σ|=|×|\+|-|/|\\'
            # We look for divs that only contain text and math symbols
            def equation_replacer(match):
                text = match.group(1).strip()
                if '<' not in text: # No inner tags
                    return f'<div class="ecuacion">{text}</div>'
                return match.group(0)

            main_content = re.sub(r'<div>\s*([^<]*?({equation_keywords})[^<]*?)\s*</div>', equation_replacer, main_content)

            # Extract Description
            desc_match = re.search(r'<p>(.*?)</p>', main_content, re.IGNORECASE | re.DOTALL)
            description = desc_match.group(1).strip() if desc_match else "Explora este fascinante tema con nosotros."
            description = re.sub(r'<.*?>', '', description)[:150] + "..."
            
            # Replace placeholders
            new_html = template.replace('{{TITLE}}', title)
            new_html = new_html.replace('{{DESCRIPTION}}', description)
            new_html = new_html.replace('{{CONTENT}}', main_content)
            new_html = new_html.replace('{{NOTICIAS}}', noticias_content)
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            
            print(f"Migrated & Enhanced: {filename}")

if __name__ == "__main__":
    migrate()
