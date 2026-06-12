# After Migration - Pending Items

Items that require follow-up after the initial 1:1 migration is complete.

## Metrics Not Available in ACK

### Istio GC Duration
- **NR Query**: `FROM Metric SELECT average(istio_agent_go_gc_duration_seconds) FACET namespaceName TIMESERIES`
- **Issue**: `istio_agent_go_gc_duration_seconds` not exposed in ACK ARMS Prometheus. Only `go_gc_duration_seconds` exists in `arms-prom` and `kube-system` namespaces.
- **Action**: Request ETS team to enable istio-agent metrics export, or configure Istio telemetry to expose GC metrics.
- **Dashboard**: Overview → "Istio GC Duration" panel (currently No Data)

### Warning Events (Infrastructure Events)
- **NR Query**: `FROM InfrastructureEvent SELECT count(event.reason) WHERE category='kubernetes' AND event.type != 'Normal' FACET event.reason, entityName, clusterName`
- **Issue**: `kube_event_count` metric not available in ACK ARMS Prometheus. ACK has `eventer_events_warning_total` but it only covers K8s-layer events, not full infrastructure (cloud + K8s combined as NR does).
- **Action**: Evaluate if `eventer_events_warning_total` is acceptable as partial replacement, or find Alicloud-level event aggregation metric.
- **Dashboard**: Overview → "Warning Events" panel (currently No Data)

## Telemetry Event Hub Connections

- **NR Original Query**: `FROM AzureEventHubNamespaceSample SELECT average(activeConnections) FACET eventHubNamespaceName TIMESERIES`
- **Current Status**: TBD placeholder — Azure Event Hub retired, no Alicloud equivalent confirmed
- **Option**: If using RocketMQ Event Streaming, can use `AliyunRocketmq5_*` metrics from cloudservice datasource
- **Next Step**: Confirm if Alicloud EventBridge or similar service needs monitoring; if so, identify metrics from cloudservice datasource

## Alertmanager Integration

### Criticals by Component / Warnings by Component
- **NR Query**: `FROM NrAiIncident SELECT uniqueCount(incidentId) WHERE priority = 'critical' FACET component`
- **Issue**: NR uses its own alert/incident system. Grafana equivalent requires Alertmanager datasource + alert rules.
- **Action**: After alert rules are configured in Grafana Alerting, replace the placeholder panels with Alertmanager queries.
- **Dashboard**: Overview → "Criticals by Component" and "Warnings by Component" panels (currently TBD placeholder)

## RabbitMQ Panels (NR Also No Data)

### RMQ Workers
- **NR Query**: `FROM K8sDeploymentSample SELECT uniqueCount(entityId) WHERE status='Unhealthy' AND namespaceName IN ('rabbitmq-system','ns-hkg-shared-service') FACET deploymentName, clusterName`
- **Issue**: NR also shows No Data. Self-hosted RMQ may no longer be in use.
- **Current PromQL**: `kube_deployment_status_replicas_unavailable{namespace=~"rabbitmq.*|ns-hkg-shared.*"} > 0` (No Data)
- **Option**: If migrated to Alicloud managed AMQP, use `AliyunAmqp_instance_InstanceConsumers` from cloudservice datasource.
- **Dashboard**: Overview → "RMQ Workers" panel

### RMQ PVC Ratio
- **NR Query**: `FROM K8sVolumeSample SELECT average(fsUsedBytes/fsCapacityBytes*100) WHERE namespaceName='rabbitmq-system' FACET pvcName, clusterName`
- **Issue**: NR also shows No Data. PVC data unavailable — RMQ may have been decommissioned or migrated to managed service.
- **Current PromQL**: `kubelet_volume_stats_used_bytes{namespace=~"rabbitmq.*"} / kubelet_volume_stats_capacity_bytes{namespace=~"rabbitmq.*"} * 100` (No Data)
- **Option**: If migrated to Alicloud managed AMQP, use `AliyunAmqp_instance_InstanceQueueMessageAccumulation` from cloudservice datasource.
- **Dashboard**: Overview → "RMQ PVC Ratio" panel
