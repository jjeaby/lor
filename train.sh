#CUDA_VISIBLE_DEVICES=0 TF_AUTO_MIXED_PRECISION_GRAPH_REWRITE_IGNORE_PERFORMANCE=1  onmt-main --model_type Transformer --auto_config --config lor.config  --mixed_precision train --num_gpu 1
CUDA_VISIBLE_DEVICES=0,1,2,3 onmt-main --model_type Transformer --auto_config --config lor.config  --mixed_precision train --num_gpu 4
#CUDA_VISIBLE_DEVICES=3 onmt-main --model_type Transformer --config lor.config --auto_config train --num_gpu 1
