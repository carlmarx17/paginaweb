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
            # Remove breadcrumbs/extra info from title if present
            title = title.split(' - ')[0]
            
            # Extract Main Content
            # Looking for <!-- Injected Content Starts Here --> and <!-- Injected Content Ends Here -->
            content_start = '<!-- Injected Content Starts Here -->'
            content_end = '<!-- Injected Content Ends Here -->'
            
            start_idx = content.find(content_start)
            end_idx = content.find(content_end)
            
            if start_idx != -1 and end_idx != -1:
                main_content = content[start_idx + len(content_start):end_idx].strip()
            else:
                # Fallback: extract inside <article class="content-article">
                article_match = re.search(r'<article class="content-article">(.*?)</article>', content, re.IGNORECASE | re.DOTALL)
                if article_match:
                    main_content = article_match.group(1).strip()
                else:
                    # Final fallback: extract inside <main>
                    main_match = re.search(r'<main.*?>(.*?)</main>', content, re.IGNORECASE | re.DOTALL)
                    main_content = main_match.group(1).strip() if main_match else content
            
            # Extract Description (First P or H1 subtext)
            desc_match = re.search(r'<p>(.*?)</p>', main_content, re.IGNORECASE | re.DOTALL)
            description = desc_match.group(1).strip() if desc_match else "Explora este fascinante tema con nosotros."
            # Clean up HTML tags from description
            description = re.sub(r'<.*?>', '', description)[:150] + "..."
            
            # Replace placeholders
            new_html = template.replace('{{TITLE}}', title)
            new_html = new_html.replace('{{DESCRIPTION}}', description)
            new_html = new_html.replace('{{CONTENT}}', main_content)
            new_html = new_html.replace('{{NOTICIAS}}', noticias_content)
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            
            print(f"Migrated: {filename}")

if __name__ == "__main__":
    migrate()
