<template>
  <div v-loading="loading" class="SearchTerms hp100">
    <el-scrollbar class="hp100">
      <div class="tableArea">
        <Table
          ref="table"
          border
          border-top
          :list="table.list"
          minus-height="128"
          table-name="SearchTerms"
          :summary-method="tableSummary"
          show-summary
        >
          <template #actions>
            <div class="filterArea flexMode vc p20 pb5">
              <div class="pr10 fs14">Filter</div>
              <div class="w256 pr10">
                <el-input
                  v-model="filter.campaignName"
                  clearable
                  placeholder="CampaignName"
                  @input="toFilter"
                />
              </div>
              <div class="w256 pr10">
                <el-input
                  v-model="filter.searchTerm"
                  clearable
                  placeholder="SearchTerm"
                  @input="toFilter"
                />
              </div>
            </div>
          </template>
          <el-table-column
            type="selection"
            fixed="left"
            width="56"
            align="center"
          ></el-table-column>
          <el-table-column
            label="SearchTerm"
            prop="searchTerm"
            width="200"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="MatchSource" prop="matchSource" width="140">
          </el-table-column>
          <el-table-column
            label="KeywordID"
            prop="keywordId"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="Keyword"
            prop="keyword"
            width="200"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="Country" prop="country" width="120" sortable>
            <template #default="{ row }">
              <div class="flexMode vc">
                <span class="areaicon" :class="'area-' + row.country"></span>
                <span class="p0-10">{{ row.countryName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="MatchType"
            prop="matchType"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="Max CPT Bid"
            prop="maxCptBid"
            width="140"
            sortable
          >
            <template #default="{ row }">
              <span>\${{ row.maxCptBid }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="AdGroupName"
            prop="adGroupName"
            width="200"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="Spend" prop="spend" width="120" sortable>
            <template #default="{ row }">
              <span>\${{ row.spend }}</span>
            </template>
          </el-table-column>
          <el-table-column label="SpendPerDay" prop="spendPerDay" width="220">
            <template #default="{ row }">
              <div v-if="row.spendPerDay.id" class="h56 w192">
                <Chart :options="row.spendPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="AVG CPA" prop="avgCpa" width="120" sortable>
            <template #default="{ row }">
              <span>\${{ row.avgCpa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="CPA Per Day" prop="cpaPerDay" width="220">
            <template #default="{ row }">
              <div v-if="row.cpaPerDay.id" class="h56 w192">
                <Chart :options="row.cpaPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="AVG CPT" prop="avgCpt" width="120" sortable>
            <template #default="{ row }">
              <span>\${{ row.avgCpt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="CPT Per Day" prop="cptPerDay" width="220">
            <template #default="{ row }">
              <div v-if="row.cptPerDay.id" class="h56 w192">
                <Chart :options="row.cptPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="AVG CPM" prop="avgCpm" width="120" sortable>
            <template #default="{ row }">
              <span>\${{ row.avgCpm }}</span>
            </template>
          </el-table-column>
          <el-table-column label="CPM Per Day" prop="cpmPerDay" width="220">
            <template #default="{ row }">
              <div v-if="row.cpmPerDay.id" class="h56 w192">
                <Chart :options="row.cpmPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Impressions"
            prop="impressions"
            width="160"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="Impressions Per Day"
            prop="impressionsPerDay"
            width="220"
          >
            <template #default="{ row }">
              <div v-if="row.impressionsPerDay.id" class="h56 w192">
                <Chart :options="row.impressionsPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="Taps" prop="taps" width="120" sortable>
          </el-table-column>
          <el-table-column
            label="Installs"
            prop="installs"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column label="TTR" prop="ttr" width="120" sortable>
            <template #default="{ row }">
              <span>{{ row.ttr }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="TTR Per Day" prop="ttrPerDay" width="220">
            <template #default="{ row }">
              <div v-if="row.ttrPerDay.id" class="h56 w192">
                <Chart :options="row.ttrPerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="ConversionRate"
            prop="conversionRate"
            width="160"
            sortable
          >
            <template #default="{ row }">
              <span>{{ row.conversionRate }}%</span>
            </template>
          </el-table-column>
          <el-table-column
            label="ConversionRate Per Day"
            prop="conversionRatePerDay"
            width="220"
          >
            <template #default="{ row }">
              <div v-if="row.conversionRatePerDay.id" class="h56 w192">
                <Chart :options="row.conversionRatePerDay.options"></Chart>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="ReDownloads"
            prop="reDownloads"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="NewDownloads"
            prop="newDownloads"
            width="160"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="LatOnInstalls"
            prop="latOnInstalls"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="LatOffInstalls"
            prop="latOffInstalls"
            width="140"
            sortable
          >
          </el-table-column>
        </Table>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SearchTerms',
});
import { reactive } from 'vue';
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
