---
allowed-tools: Task, Read, Write, Bash
argument-hint: "评审内容"
description: R2审查评估阶段命令 - 质量评审、文档检查、经验沉淀
---

# /review - R2审查评估阶段命令

## 命令说明

执行RIPER-6的R2（Review）阶段，进行全面评审和经验沉淀。

## 执行流程

```markdown
=== R2-REVIEW 阶段 ===

**QE**:
创建: /project_document/reviews/quality_report.md
- 测试执行情况
- 缺陷统计
- 质量评估

**PDM**:
创建: /project_document/reviews/product_review.md
- 需求实现情况
- 用户价值评估
- 改进建议

**AR**:
创建: /project_document/reviews/architecture_review.md
- 架构符合性
- 技术评审
- 安全评估

**DW**:
1. 文档完整性检查
2. 使用memory提交经验：
   - 需求分析经验
   - 架构设计经验
   - 实现经验
   - 测试经验
3. 创建: /project_document/reviews/documentation_summary.md

**PM**:
创建: /project_document/reviews/project_summary.md
- 项目总结
- 成果清单
- 经验教训
```

## 输出
- quality_report.md
- product_review.md
- architecture_review.md
- documentation_summary.md
- project_summary.md
- memory中的经验沉淀

---

**建议**: 通常通过 `/develop` 自动调用，无需单独使用。
