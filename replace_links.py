import os

OLD = "https-//aimlapi-com/app/"
NEW = "https://aimlapi.com/app/"

def process_md_files(root="."):
    changed_files = []
    total_replacements = 0

    for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            if filename.endswith(".md"):
                full_path = os.path.join(dirpath, filename)

                with open(full_path, "r", encoding="utf-8") as f:
                    content = f.read()

                count = content.count(OLD)
                if count == 0:
                    continue

                new_content = content.replace(OLD, NEW)

                with open(full_path, "w", encoding="utf-8") as f:
                    f.write(new_content)

                changed_files.append((full_path, count))
                total_replacements += count
                print(f"Fixed {count} → {full_path}")

    print("\n=== Summary ===")
    if changed_files:
        for path, cnt in changed_files:
            print(f"{path} — {cnt} replacements")
        print(f"\nTotal: {total_replacements}")
    else:
        print("No files were modified.")

if __name__ == "__main__":
    process_md_files(".")
