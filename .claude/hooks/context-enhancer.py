#!/usr/bin/env python3
"""
上下文增强器
为各个agent提供项目上下文信息
"""

import json
import sys
import os

def get_project_context():
    """获取项目上下文"""
    context = []
    
    # 检查project_document目录
    project_doc = os.path.join(os.getcwd(), '.claude', 'project_document')
    if os.path.exists(project_doc):
        context.append(f"📁 项目文档目录存在")
    
    return context

def main():
    try:
        input_data = json.load(sys.stdin)
        
        context = get_project_context()
        
        if context:
            context_text = "\n".join(context)
            output = {
                "hookSpecificOutput": {
                    "hookEventName": "UserPromptSubmit",
                    "additionalContext": f"\n\n📋 项目上下文:\n{context_text}"
                }
            }
            print(json.dumps(output))
        
        sys.exit(0)
    except Exception as e:
        print(f"上下文增强错误: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
