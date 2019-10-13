CUDA_VISIBLE_DEVICES=0 TF_AUTO_MIXED_PRECISION_GRAPH_REWRITE_IGNORE_PERFORMANCE=1  onmt-main --model_type Transformer --auto_config --config lor.config  --mixed_precision train --num_gpu 1
