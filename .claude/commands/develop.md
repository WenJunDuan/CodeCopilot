---
allowed-tools: Task, Read, Write, Bash
argument-hint: "需求描述"
description: 完整的RIPER-6开发流程，自动整合R1→I→P→E→R2，支持P.A.C.E.智能路由
---

# /develop - 完整开发流程命令

## 命令说明

`/develop` 是最强大的工作流命令，自动执行完整的RIPER-6流程。它会：
1. 通过P.A.C.E.路由分析任务复杂度
2. 选择最合适的执行路径（Path_A/B/C）
3. 自动调用6个角色Agent协作
4. 整合所有MCP工具的能力
5. 在关键节点使用mcp-feedback-enhanced确认

这是团队最常用的命令，适合80%的开发场景。

## 使用方式

```bash
/develop "实现用户登录功能"
/develop "设计RESTful API系统"
/develop "构建微服务电商平台"
```

## P.A.C.E.智能路由

命令首先调用 `pace-router.py` 分析任务复杂度，选择执行路径：

### Path_A: 快速执行（Simple）
**适用**: 简单功能开发，1-3天完成
**特点**: 
- PM+核心角色快速协作
- 最少的用户确认
- 自动化程度最高

**示例**:
- "实现用户登录功能"
- "添加搜索过滤条件"
- "修复XX bug"

### Path_B: 标准协作（Medium）
**适用**: 中等复杂度项目，1-2周完成
**特点**:
- 完整的6角色协作
- 关键节点确认
- 平衡自动化与控制

**示例**:
- "设计RESTful API系统"
- "实现用户权限管理"
- "构建数据分析dashboard"

### Path_C: 深度执行（Complex）
**适用**: 复杂系统项目，1个月+
**特点**:
- 分阶段深度协作
- 每阶段需要确认
- 多次团队会议决策

**示例**:
- "构建微服务电商平台"
- "重构整个系统架构"
- "设计分布式数据处理系统"

## 执行流程

### 第0步：P.A.C.E.路由分析

```
[HOOK: context-enhancer.py] 
→ 增强项目上下文信息

[HOOK: pace-router.py]
→ 分析任务复杂度
→ 选择Path_A/B/C

输出：
{
  "selected_path": "Path_B",
  "complexity_score": 65,
  "reasoning": "中等复杂度，需要完整角色协作",
  "estimated_duration": "2周",
  "key_risks": ["需要明确权限模型", "性能要求待定"]
}
```

### 第1步：R1-RESEARCH（研究阶段）

**主导**: PDM
**协作**: PM, AR, DW

```
1. PDM主导需求分析
   [INTERNAL_ACTION: Analyzing via context7.]
   
   - 使用context7深度分析需求
   - 理解业务目标和使用场景
   - 评估用户价值和商业价值
   - 定义需求优先级（P0/P1/P2/P3）
   
   输出: /project_document/research/requirements_analysis.md

2. DW提供历史经验
   [INTERNAL_ACTION: Recalling via memory.]
   
   - 查询类似项目经验
   - 提供需求分析的经验教训
   - 识别常见陷阱
   
   输出: 历史经验参考列表

3. AR评估技术可行性
   [INTERNAL_ACTION: Evaluating via sequential-thinking.]
   
   - 评估技术可行性
   - 识别技术约束和风险
   - 提出预研建议
   
   输出: 技术可行性评估

4. PM决策确认
   - 审阅需求分析报告
   - 确认项目方向和范围
   - 决定是否进入I阶段

[mcp-feedback-enhanced] 
在Path_B/C中确认: "需求分析完成，是否进入方案设计？"
```

### 第2步：I-INNOVATE（创新设计）

**主导**: AR
**协作**: PM, PDM, LD, DW

```
1. AR设计技术方案
   [INTERNAL_ACTION: Designing via sequential-thinking.]
   
   - 系统架构设计
   - 技术选型决策
   - 模块划分和接口设计
   - 非功能性设计（性能、安全、可用性）
   
   输出: /project_document/proposals/architecture_design.md

2. PDM评审方案
   - 从产品角度评估
   - 确认满足核心需求
   - 提供用户体验建议
   
   输出: 产品视角评审意见

3. LD评估实现难度
   - 评估开发复杂度
   - 识别技术难点
   - 提出实现建议
   
   输出: 实现可行性评估

4. DW记录设计决策
   - 记录关键技术决策
   - 记录备选方案和权衡
   - 创建架构文档框架
   
   输出: /project_document/proposals/design_decisions.md

5. 团队评审（如需要）
   如果是复杂方案，触发 /meeting "技术方案评审"
   
[mcp-feedback-enhanced]
确认: "技术方案设计完成，是否进入任务规划？"
```

### 第3步：P-PLAN（规划阶段）

**主导**: PM
**协作**: AR, LD, PDM, QE

```
1. PM使用shrimp-task-manager规划
   [TOOL: shrimp-task-manager]
   
   - 创建项目任务树
   - 定义里程碑
   - 设置任务依赖关系
   - 评估复杂度和工期
   
   输出: 任务管理系统中的完整任务结构

2. AR分解技术任务
   - 按模块分解任务
   - 标注任务复杂度
   - 识别技术依赖
   - 定义技术里程碑
   
   输出: 技术任务分解

3. PDM确认任务优先级
   - 为每个任务标注业务价值
   - 确认验收标准
   - 建议实现顺序
   
   输出: 任务优先级和验收标准

4. LD评估工作量
   - 评估每个任务的工时
   - 识别技术风险
   - 提出资源需求
   
   输出: 工作量评估

5. QE规划测试
   - 创建测试计划
   - 设计测试用例
   - 准备测试环境
   
   输出: /project_document/plans/test_plan.md

[mcp-feedback-enhanced]
确认: "项目计划完成，团队规模[X]人，工期[Y]周，是否开始开发？"
```

### 第4步：E-EXECUTE（执行阶段）

**主导**: LD
**协作**: 全团队

```
执行循环（直到所有任务完成）:

1. LD选择任务
   从shrimp-task-manager中选择：
   - 优先级最高
   - 依赖已完成
   - 当前可执行的任务

2. LD实现功能
   [TOOL: mcp-git-ops]
   - 创建功能分支
   - TDD开发（先测试后实现）
   - 使用playwright创建自动化测试
   - 代码自审
   - 提交代码
   
   [TOOL: mcp-pgsql-tools]（如需要）
   - 数据库迁移
   - 数据准备
   - 数据验证

3. 需求澄清（如需要）
   LD遇到疑问 → 咨询PDM
   [PDM: Using context7 to clarify]
   
4. 技术支持（如需要）
   LD遇到技术难题 → 咨询AR
   [AR: Using sequential-thinking to solve]

5. 质量检查
   [HOOK: quality-gate.py] 
   → 代码提交后自动触发
   → 检查代码质量、测试覆盖
   
   QE执行测试:
   [TOOL: playwright]
   - 功能测试
   - 回归测试
   - 性能测试
   - 安全测试

6. 文档更新
   DW实时更新:
   - API文档
   - 使用说明
   - 变更记录

7. 更新任务状态
   [HOOK: task-tracker.py]
   → 自动同步任务状态到shrimp-task-manager

8. 进度报告
   PM监控进度:
   - 每日站会（可选）
   - 每周进度报告
   - 风险识别和处理

重复1-8，直到所有任务完成

[mcp-feedback-enhanced]
在关键里程碑确认:
- "核心功能完成，是否继续？"
- "MVP完成，是否进入测试？"
```

### 第5步：R2-REVIEW（审查阶段）

**主导**: QE, PM
**协作**: 全团队

```
1. QE质量评审
   - 执行完整测试
   - 统计缺陷情况
   - 评估质量指标
   - 评估发布风险
   
   输出: /project_document/reviews/quality_report.md

2. PDM产品验收
   - 验证需求完成度
   - 评估用户体验
   - 收集改进建议
   
   输出: /project_document/reviews/product_review.md

3. AR架构评审
   - 评估架构符合性
   - 检查代码质量
   - 识别技术债务
   
   输出: /project_document/reviews/architecture_review.md

4. PM综合评估
   - 审阅所有评审报告
   - 评估项目成果
   - 决策发布时机
   
   输出: /project_document/reviews/project_summary.md

5. 团队复盘
   触发 /meeting "项目复盘"
   
   - 回顾做得好的地方
   - 讨论需要改进的地方
   - 总结经验教训
   - 提出改进建议

6. DW经验沉淀
   [INTERNAL_ACTION: Submitting to memory.]
   
   - 整理项目经验
   - 提交到memory
   - 编写复盘报告
   
   输出: /project_document/reviews/project_retrospective.md

[mcp-feedback-enhanced]
最终确认: "项目审查完成，质量等级[X]，是否批准发布？"
```

## 输出文件结构

执行完成后，/project_document目录结构：

```
/project_document/
├── research/
│   ├── requirements_analysis.md      (PDM, R1阶段)
│   └── tech_research.md              (AR, R1阶段)
│
├── proposals/
│   ├── architecture_design.md        (AR, I阶段)
│   └── design_decisions.md           (DW, I阶段)
│
├── plans/
│   ├── project_plan.md               (PM, P阶段)
│   └── test_plan.md                  (QE, P阶段)
│
├── code/
│   └── (由LD开发的代码，通过git管理)
│
└── reviews/
    ├── quality_report.md             (QE, R2阶段)
    ├── product_review.md             (PDM, R2阶段)
    ├── architecture_review.md        (AR, R2阶段)
    ├── project_summary.md            (PM, R2阶段)
    └── project_retrospective.md      (DW, R2阶段)
```

## 路径差异对比

| 特性 | Path_A | Path_B | Path_C |
|-----|--------|--------|--------|
| 适用场景 | 简单功能 | 中等项目 | 复杂系统 |
| 工期 | 1-3天 | 1-2周 | 1月+ |
| 用户确认 | 最少（仅R2） | 适中（R1/I/R2） | 最多（每阶段） |
| 团队会议 | 不需要 | 按需 | 多次 |
| 文档详细度 | 简化 | 标准 | 详尽 |
| Subagents | 不创建 | 可能创建 | 一定创建 |

## 使用示例

### 示例1：简单功能（Path_A）

```bash
用户: /develop "实现用户登录功能"

系统: 
[pace-router] 分析复杂度: Simple (25/100)
[pace-router] 选择路径: Path_A
[pace-router] 预计工期: 2天

→ R1-RESEARCH
  [PDM via context7] 分析需求...
  需求明确：用户名密码登录，JWT认证
  
→ I-INNOVATE
  [AR via sequential-thinking] 设计方案...
  选择：JWT+Redis，标准RESTful API
  
→ P-PLAN
  [PM via shrimp-task-manager] 规划任务...
  任务分解：3个任务，预计16小时
  
→ E-EXECUTE
  [LD] 开发实现...
  - [playwright] 创建E2E测试 ✓
  - 实现登录API ✓
  - 实现token验证 ✓
  [QE] 测试验证...
  测试通过，覆盖率85%
  
→ R2-REVIEW
  [QE] 质量评审: A级，可发布
  [PDM] 产品验收: 通过
  [PM] 批准发布
  [DW via memory] 经验已沉淀

✅ 完成！用户登录功能已实现并通过测试。

时长：实际1.5天
代码：500行
测试：15个用例
质量：A级
```

### 示例2：中等项目（Path_B）

```bash
用户: /develop "设计RESTful API系统"

系统:
[pace-router] 分析复杂度: Medium (65/100)
[pace-router] 选择路径: Path_B
[pace-router] 预计工期: 2周

→ R1-RESEARCH (3天)
  [PDM via context7] 深度需求分析...
  [DW via memory] 查询API设计经验...
  [AR] 技术可行性评估...
  
  [mcp-feedback-enhanced] 
  📋 需求分析完成
  - 核心接口：15个
  - 非功能需求：明确
  - 技术风险：可控
  
  ❓ 是否进入方案设计？ [Y/n]
  
用户: Y

→ I-INNOVATE (2天)
  [AR via sequential-thinking] 架构设计...
  - RESTful规范设计
  - 认证授权方案
  - 错误处理机制
  - API文档规范
  
  [PDM] 产品视角评审...
  [LD] 实现难度评估...
  
  [mcp-feedback-enhanced]
  📋 技术方案完成
  - 架构：微服务化
  - 技术栈：Spring Boot + PostgreSQL
  - 预估工期：2周
  
  ❓ 是否进入任务规划？ [Y/n]

用户: Y

→ P-PLAN (1天)
  [PM via shrimp-task-manager] 任务规划...
  - 创建30个任务
  - 定义5个里程碑
  - 分配优先级
  
  [AR] 技术任务分解...
  [QE] 测试计划制定...
  
  [mcp-feedback-enhanced]
  📋 项目计划完成
  - 任务：30个
  - 工期：10天
  - 团队：3人
  
  ❓ 是否开始开发？ [Y/n]

用户: Y

→ E-EXECUTE (10天)
  [Day 1-3] 基础架构搭建
    [LD] 项目初始化 ✓
    [LD] 数据库设计 ✓
    [LD] 认证模块 ✓
    
  [Day 4-7] 核心API开发
    [LD] 用户管理API ✓
    [LD] 权限管理API ✓
    [LD] 业务API ✓
    [QE via playwright] 持续测试...
    
  [Day 8-9] 文档和优化
    [DW] API文档完善 ✓
    [LD] 性能优化 ✓
    [QE] 完整回归测试 ✓
    
  [Day 10] 集成测试
    [QE] 性能测试 ✓
    [QE] 安全测试 ✓

→ R2-REVIEW (1天)
  [QE] 质量报告: A级
  [PDM] 产品验收: 满足需求
  [AR] 架构评审: 符合设计
  [PM] 综合评估: 批准发布
  
  [会议] 项目复盘
  [DW via memory] 经验沉淀

✅ 完成！RESTful API系统已上线。

时长：14天
代码：8000行
接口：15个
测试：120个用例
质量：A级
性能：响应<200ms
```

### 示例3：复杂系统（Path_C）

```bash
用户: /develop "构建微服务电商平台"

系统:
[pace-router] 分析复杂度: Complex (90/100)
[pace-router] 选择路径: Path_C
[pace-router] 预计工期: 8周
[pace-router] 建议：创建专业Subagents

→ R1-RESEARCH (1周)
  [会议] 项目启动会
  
  [PDM via context7] 全面需求分析...
  - 用户域需求
  - 商品域需求
  - 订单域需求
  - 支付域需求
  - 物流域需求
  
  [DW via memory] 查询电商项目经验...
  [AR] 微服务架构预研...
  
  [会议] 需求评审会
  
  [mcp-feedback-enhanced]
  📋 需求研究完成 (87页文档)
  - 5大业务域
  - 30+核心功能
  - 高并发要求（10000 QPS）
  - 复杂的业务规则
  
  ❓ 需求规模较大，是否进入架构设计？ [Y/n]

用户: Y

→ I-INNOVATE (2周)
  [AR via sequential-thinking] 深度架构设计...
  
  Week 1: 总体架构
  - 微服务划分（8个服务）
  - 服务间通信方案
  - 数据一致性方案
  - 高可用设计
  
  Week 2: 详细设计
  - 每个服务的详细设计
  - API网关设计
  - 消息队列设计
  - 缓存策略设计
  
  [会议] 架构评审会
  - PDM评审需求符合度
  - LD评审实现可行性
  - QE评审可测试性
  
  [mcp-feedback-enhanced]
  📋 架构设计完成 (120页文档)
  - 微服务：8个
  - 技术栈：Spring Cloud
  - 数据库：PostgreSQL + MongoDB
  - 缓存：Redis
  - 消息：RabbitMQ
  
  ❓ 架构方案是否批准？ [Y/n]

用户: Y

→ P-PLAN (3天)
  [PM via shrimp-task-manager] 详细规划...
  - 创建200+任务
  - 定义20+里程碑
  - 安排6周开发时间
  - 团队规模：8人
  
  [会议] 计划评审会
  
  [mcp-feedback-enhanced]
  📋 项目计划完成
  - 任务：237个
  - 工期：6周开发 + 1周测试
  - 团队：8人（2 LD + 2 QE + ...）
  - 总工时：约1200小时
  
  ❓ 计划是否批准？资源是否到位？ [Y/n]

用户: Y

→ E-EXECUTE (6周)
  Week 1-2: 基础设施
    [LD] 服务框架搭建
    [LD] 数据库设计
    [LD] 基础服务（用户、认证）
    
  [mcp-feedback-enhanced]
  📋 里程碑1完成
  - 基础设施就绪
  - 用户服务上线
  ❓ 是否继续？ [Y/n]
  
  Week 3-4: 核心业务
    [LD] 商品服务
    [LD] 订单服务
    [LD] 购物车服务
    [QE via playwright] 持续测试
    
  [mcp-feedback-enhanced]
  📋 里程碑2完成
  - 核心业务服务就绪
  - 基础交易流程打通
  ❓ 是否继续？ [Y/n]
  
  Week 5-6: 支付与物流
    [LD] 支付服务集成
    [LD] 物流服务
    [LD] 性能优化
    [QE] 压力测试
    
  [mcp-feedback-enhanced]
  📋 里程碑3完成
  - 全部服务已开发
  - 性能测试通过
  ❓ 进入最终测试？ [Y/n]

→ R2-REVIEW (1周)
  [QE] 全面测试
  - 功能测试 ✓
  - 性能测试 ✓ (达到12000 QPS)
  - 安全测试 ✓
  - 压力测试 ✓
  
  [会议] 发布评审会
  - QE: 质量A级
  - PDM: 满足需求
  - AR: 架构稳定
  - PM: 批准上线
  
  [会议] 项目复盘会
  [DW via memory] 经验沉淀

✅ 完成！微服务电商平台已上线！

时长：8周
代码：50000+行
服务：8个微服务
接口：80+个API
测试：500+个用例
质量：A级
性能：12000 QPS
```

## 关键特性

### 1. 智能路由
- 自动分析任务复杂度
- 选择最优执行路径
- 动态调整协作深度

### 2. 工具整合
- **shrimp-task-manager**: 任务规划和追踪
- **context7**: 需求深度分析（PDM）
- **sequential-thinking**: 技术深度推理（AR）
- **playwright**: 自动化测试（LD/QE）
- **memory**: 经验回忆和沉淀（DW）
- **mcp-git-ops**: 版本控制（LD）
- **mcp-pgsql-tools**: 数据库操作（LD）
- **mcp-feedback-enhanced**: 关键节点确认

### 3. 自动化Hook
- **context-enhancer**: 自动增强项目上下文
- **pace-router**: 自动选择执行路径
- **task-tracker**: 自动同步任务状态
- **quality-gate**: 自动质量检查

### 4. 灵活确认
- Path_A: 最少确认（快速）
- Path_B: 适中确认（平衡）
- Path_C: 充分确认（稳健）

## 最佳实践

1. **清晰需求** - 提供清晰的需求描述
2. **信任路由** - 相信P.A.C.E.的判断
3. **及时确认** - 在确认点及时响应
4. **问题反馈** - 遇到问题及时沟通
5. **经验沉淀** - 项目结束认真复盘

## 注意事项

- 首次使用建议从简单任务开始
- 复杂项目可能需要多次迭代
- 确认点不要跳过，确保理解当前状态
- 出现问题可以暂停，团队讨论后继续
- 及时更新shrimp-task-manager中的任务状态

---

**/develop是最强大的命令，整合了团队的集体智慧和所有工具的能力！**
